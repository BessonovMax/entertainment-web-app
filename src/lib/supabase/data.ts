import {
  MediaRecord,
  ProductCardType,
  SupabaseBookmarkRecord,
  User,
} from "@/lib/types";

const TMDB_IMAGE_BASE_URL =
  process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

function mapMediaRecordToProductCard(item: MediaRecord): ProductCardType {
  const posterPath = item.poster_path
    ? `${TMDB_IMAGE_BASE_URL}w500/${item.poster_path}`
    : "/thumbnails/No-Image-Placeholder.svg"; // Убедитесь, что у вас есть запасное изображение

  // Определяем год, название и категорию в зависимости от типа медиа
  const isMovie = item.media_type === "movie";

  const category = isMovie ? "Movie" : "TV Series";

  return {
    id: item.id,
    title: item.title,
    thumbnail: {
      regular: { small: posterPath, medium: posterPath, large: posterPath },
    },
    year: item.release_date,
    category: category,
    media_type: item.media_type as "movie" | "tv" | "person",
    rating: item.adult ? "18+" : "PG", // Упрощенное определение рейтинга
    isBookmarked: true,
    isTrending: false, // Мы будем устанавливать этот флаг в зависимости от эндпоинта
  };
}

export async function getUserBookmarkedMedia(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  user: User,
): Promise<ProductCardType[]> {
  const { data: records, error } = await supabase
    .from("bookmarks")
    .select(
      `
      media_id,
      media (
        id, title, release_date, adult, poster_path, media_type
      )
    `,
    )
    .eq("user_id", user.id);

  const typedRecords = records as SupabaseBookmarkRecord[] | null;

  if (error) {
    console.error("Error fetching user bookmarks:", error);
    return [];
  }

  if (!typedRecords) {
    return [];
  }

  return typedRecords
    .filter((record) => record.media !== null)
    .map((record) => mapMediaRecordToProductCard(record.media));
}

export async function getUserBookmarkedIds(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  user: User,
): Promise<Array<number>> {
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("media_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching bookmarked IDs:", error);
    return [];
  }
  return bookmarks?.map((b: { media_id: number }) => b.media_id) || [];
}
