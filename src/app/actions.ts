"use server"; // This directive marks all functions in this file as Server Actions

import { getPopularMedia, searchMedia } from "@/lib/tmdb";
import { createClient } from "@/lib/supabase/server";
import { type ProductCardType } from "@/lib/types";
import { revalidateTag } from "next/cache";

const TMDB_IMAGE_BASE_URL =
  process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

/**
 * A Server Action to fetch the next page of popular media.
 * This is safe to call from the client because the API key is never exposed.
 * @param page - The page number to fetch.
 */
export async function fetchMoreMedia(
  page: number,
  media_variant: "movie" | "tv" | "multi",
  bookmarkedIds: Set<number>,
) {
  const moreMedia = await getPopularMedia(page, media_variant, bookmarkedIds);
  return moreMedia;
}

export async function searchMoreMedia(
  query: string,
  page: number,
  media_variant: "movie" | "tv" | "multi",
  bookmarkedIds: Set<number>,
) {
  const moreSearchResults = await searchMedia(
    query,
    page,
    media_variant,
    bookmarkedIds,
  );
  return moreSearchResults;
}

/**
 * Сохраняет/обновляет детали медиафайла в нашей таблице `media`.
 * Вызывается, когда пользователь впервые добавляет что-то в закладки.
 */
export async function upsertMedia(mediaItem: ProductCardType) {
  const supabase = await createClient();
  const { id, title, year, rating, thumbnail, media_type } = mediaItem;

  // Извлекаем относительные пути для хранения
  const poster_path =
    thumbnail.regular.large.replace(TMDB_IMAGE_BASE_URL, "").split("/")[1] ||
    "";
  const { error } = await supabase.from("media").upsert(
    {
      id: id,
      title,
      release_date: year,
      adult: rating === "18+",
      poster_path,
      media_type: media_type,
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Error upserting media:", error.message);
  }
}

/**
 * Добавляет запись в таблицу `bookmarks`.
 */
export async function addBookmark(
  userId: string,
  mediaId: number,
  mediaType: "movie" | "tv" | "person",
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: userId, media_id: mediaId, media_type: mediaType });
  revalidateTag(`bookmarks:${userId}`);
  if (error) console.error("Error adding bookmark:", error.message);
}

/**
 * Удаляет запись из таблицы `bookmarks`.
 */
export async function removeBookmark(userId: string, mediaId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .match({ user_id: userId, media_id: mediaId });
  revalidateTag(`bookmarks:${userId}`);
  if (error) console.error("Error removing bookmark:", error.message);
}
