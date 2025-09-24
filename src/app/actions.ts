"use server"; // This directive marks all functions in this file as Server Actions

import { getPopularMedia, searchMedia } from "@/lib/tmdb";
import { MediaType } from "@/lib/types";

/**
 * A Server Action to fetch the next page of popular media.
 * This is safe to call from the client because the API key is never exposed.
 * @param page - The page number to fetch.
 */
export async function fetchMoreMedia(page: number, media_type: MediaType) {
  const moreMedia = await getPopularMedia(page, media_type);
  return moreMedia;
}

export async function searchMoreMedia(
  query: string,
  page: number,
  media_type: MediaType,
) {
  const moreSearchResults = await searchMedia(query, page, media_type);
  return moreSearchResults;
}
