// src/lib/tmdb.ts

import type {
  ProductListType,
  ProductCardType,
  TmdbResult,
  PaginatedResponse,
  MediaType,
} from "@/lib/types";
import { createClient } from "./supabase/server";

// Константы для удобства
const TMDB_API_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;
const TMDB_BASE_URL =
  process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL =
  process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

/**
 * Создает простой генератор псевдослучайных чисел (PRNG) с использованием "семени".
 * param seed - Число, которое будет инициализировать генератор.
 */
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
/**
 * Перемешивает массив предсказуемым образом, используя "семя".
 * @param array - Массив для перемешивания.
 * @param seed - Строка или число, на основе которого будет происходить перемешивание.
 */

function seededShuffle<T>(array: T[], seed: string | number): T[] {
  let seedNum: number;
  if (typeof seed === "string") {
    // Преобразуем строковое семя (например, дату) в число
    seedNum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  } else {
    seedNum = seed;
  }

  const random = createSeededRandom(seedNum);
  const result = [...array]; // Создаем копию, чтобы не изменять исходный массив

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Функция-адаптер.
 * Преобразует один объект, полученный от TMDB API,
 * в унифицированный формат ProductCardType, который используют ваши компоненты.
 */
function mapTmdbToProductCard(
  item: TmdbResult,
  bookmarkedIds: Set<number>,
  forcedType?: MediaType,
): ProductCardType {
  const posterPath = item.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500${item.poster_path}`
    : "/thumbnails/No-Image-Placeholder.svg"; // Убедитесь, что у вас есть запасное изображение
  const backdropPath = item.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}w1280${item.backdrop_path}`
    : posterPath; // Если нет фона, используем постер

  const mediaType: MediaType =
    forcedType ||
    (item.media_type === "movie" || item.media_type === "tv"
      ? item.media_type
      : null) ||
    (item.title ? "movie" : "tv");

  const category = mediaType === "movie" ? "Movie" : "TV Series";

  // Определяем год, название и категорию в зависимости от типа медиа
  const year =
    new Date(item.release_date || item.first_air_date || "").getFullYear() ||
    2024;
  const title = item.title || item.name || "Unknown Title";

  return {
    id: item.id,
    title: title,
    thumbnail: {
      regular: { small: posterPath, medium: posterPath, large: posterPath },
      trending: { small: backdropPath, large: backdropPath },
    },
    year: year,
    category: category,
    media_type: mediaType,
    rating: item.adult ? "18+" : "PG", // Упрощенное определение рейтинга
    isBookmarked: bookmarkedIds.has(item.id),
    isTrending: false, // Мы будем устанавливать этот флаг в зависимости от эндпоинта
  };
}

async function fetchFromTMDB(endpoint: string): Promise<{
  total_results: number;
  total_pages: number;
  page: number;
  results: TmdbResult[];
}> {
  if (!TMDB_API_TOKEN) {
    throw new Error(
      "TMDB API Token is not configured in environment variables.",
    );
  }

  const url = `${TMDB_BASE_URL}/${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
    // Добавляем кэширование Next.js
    next: {
      revalidate: 60 * 60 * 24, // Кэшировать на 24 часа
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`TMDB API Error: ${response.statusText}`);
      return { page: 1, results: [], total_pages: 0, total_results: 0 }; // Возвращаем пустой массив при ошибке
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from TMDB:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

async function getUserBookmarkedIds(): Promise<Set<number>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("media_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching bookmarked IDs:", error);
    return new Set();
  }
  return new Set(bookmarks?.map((b) => b.media_id) || []);
}

export async function getTrendingMedia(): Promise<ProductListType> {
  const [data, bookmarkedIds] = await Promise.all([
    fetchFromTMDB("trending/all/week"),
    getUserBookmarkedIds(),
  ]);
  const mappedData = data.results.map((item) =>
    mapTmdbToProductCard(item, bookmarkedIds),
  );
  // Устанавливаем флаг isTrending для этих результатов
  mappedData.forEach((item: ProductCardType) => (item.isTrending = true));
  return mappedData;
}

export async function getPopularMedia(
  page: number = 1,
  media_type: "movie" | "tv" | "multi" = "multi",
): Promise<ProductListType> {
  if (media_type === "multi") {
    const [resultMovies, resultTvShows, bookmarkedIds] = await Promise.all([
      fetchFromTMDB(`movie/popular?language=en-US&page=${page}`),
      fetchFromTMDB(`tv/popular?language=en-US&page=${page}`),
      getUserBookmarkedIds(),
    ]);

    const popularMovies = resultMovies.results.map((item) =>
      mapTmdbToProductCard(item, bookmarkedIds),
    );
    const popularTvShows = resultTvShows.results.map((item) =>
      mapTmdbToProductCard(item, bookmarkedIds),
    );

    const combinedMedia = [...popularMovies, ...popularTvShows];
    const seed = `${new Date().toISOString().slice(0, 10)}-page-${page}`;

    const shuffledMedia = seededShuffle(combinedMedia, seed);

    return shuffledMedia;
  } else if (media_type === "movie" || media_type === "tv") {
    const [data, bookmarkedIds] = await Promise.all([
      fetchFromTMDB(`${media_type}/popular?language=en-US&page=${page}`),
      getUserBookmarkedIds(),
    ]);

    return data.results.map((item) =>
      mapTmdbToProductCard(item, bookmarkedIds, media_type),
    );
  }
  return [];
}

export async function searchMedia(
  query: string,
  page: number = 1,
  media_type: "movie" | "tv" | "multi",
): Promise<PaginatedResponse> {
  const encodedQuery = encodeURIComponent(query);

  const [data, bookmarkedIds] = await Promise.all([
    fetchFromTMDB(
      `search/${media_type}?query=${encodedQuery}&page=${page}&language=en-US&include_adult=false`,
    ),
    getUserBookmarkedIds(),
  ]);

  if (!data.results) {
    return { page: 1, results: [], totalPages: 0, totalResults: 0 };
  }

  let finalResults = data.results;

  if (media_type === "multi") {
    finalResults = data.results.filter(
      (item: TmdbResult) =>
        item.media_type === "movie" || item.media_type === "tv",
    );
  }

  const mappedResults = finalResults.map((item) =>
    mapTmdbToProductCard(item, bookmarkedIds),
  );

  return {
    page: data.page,
    results: mappedResults,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
