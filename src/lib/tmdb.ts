// src/lib/tmdb.ts

import { type ProductCardType, type TmdbResult } from "./types";

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
function mapTmdbToProductCard(item: TmdbResult): ProductCardType {
  const posterPath = item.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500${item.poster_path}`
    : "/assets/placeholder.png"; // Убедитесь, что у вас есть запасное изображение
  const backdropPath = item.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}w1280${item.backdrop_path}`
    : posterPath; // Если нет фона, используем постер

  // Определяем год, название и категорию в зависимости от типа медиа
  const isMovie = item.media_type === "movie" || !!item.title;
  const year =
    new Date(item.release_date || item.first_air_date || "").getFullYear() ||
    2024;
  const title = item.title || item.name || "Unknown Title";
  const category = isMovie ? "Movie" : "TV Series";

  return {
    id: item.id,
    title: title,
    thumbnail: {
      regular: { small: posterPath, medium: posterPath, large: posterPath },
      trending: { small: backdropPath, large: backdropPath },
    },
    year: year,
    category: category,
    rating: item.adult ? "18+" : "PG", // Упрощенное определение рейтинга
    isBookmarked: false, // TMDB не знает о ваших закладках. Это будет false по умолчанию.
    isTrending: false, // Мы будем устанавливать этот флаг в зависимости от эндпоинта
  };
}

/**
 * Основная функция для выполнения запросов к TMDB API.
 * Она скрывает логику авторизации.
 */
async function fetchFromTMDB(
  endpoint: string,
): Promise<{ results: TmdbResult[] }> {
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
      return { results: [] }; // Возвращаем пустой массив при ошибке
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from TMDB:", error);
    return { results: [] };
  }
}

// --- Публичные функции, которые будут использовать ваши компоненты ---

/**
 * Получает список трендовых медиа (фильмы и сериалы) за неделю.
 */
export async function getTrendingMedia(): Promise<ProductCardType[]> {
  const data = await fetchFromTMDB("trending/all/day");
  const mappedData = data.results.map(mapTmdbToProductCard);
  // Устанавливаем флаг isTrending для этих результатов
  mappedData.forEach((item: ProductCardType) => (item.isTrending = true));
  return mappedData;
}

export async function getPopularMedia(): Promise<ProductCardType[]> {
  // --- Шаг 1: Запрашиваем оба списка ПАРАЛЛЕЛЬНО для лучшей производительности ---
  // Promise.all выполняет оба запроса одновременно, а не один за другим.
  const [moviesResponse, tvResponse] = await Promise.all([
    fetchFromTMDB("movie/popular?language=en-US&page=1"),
    fetchFromTMDB("tv/popular?language=en-US&page=1"),
  ]);

  // Извлекаем массивы результатов, предусматривая возможные ошибки
  const popularMovies: TmdbResult[] = moviesResponse.results || [];
  const popularTvShows: TmdbResult[] = tvResponse.results || [];

  // --- Шаг 2: Объединяем два массива в один ---
  const combinedMedia = [...popularMovies, ...popularTvShows];
  const seed = new Date().toISOString().slice(0, 10);
  // --- Шаг 3: Перемешиваем объединенный массив для лучшего UX ---
  const shuffledMedia = seededShuffle(combinedMedia, seed);

  // --- Шаг 4: Преобразуем финальный, перемешанный массив в наш унифицированный тип ---
  return shuffledMedia.map(mapTmdbToProductCard);
}

/**
 * Получает список популярных фильмов.
 */
export async function getPopularMovies(): Promise<ProductCardType[]> {
  const data = await fetchFromTMDB("movie/popular");
  return data.results.map(mapTmdbToProductCard);
}

// Вы можете добавить больше функций здесь: getPopularTvShows, searchMedia(query) и т.д.
