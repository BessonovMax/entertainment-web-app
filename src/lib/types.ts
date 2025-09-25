export type ProductCardType = {
  id: number;
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
    trending?: {
      small: string;
      large: string;
    };
  };
  year: number | string;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  media_type?: "movie" | "tv" | "person";
  // Добавляем опциональное поле userId, которое будем передавать в клиентские компоненты
  userId?: string;
};

export type ProductListType = ProductCardType[];

export type TmdbResult = {
  id: number;
  title?: string; // У фильмов есть title
  name?: string; // У сериалов есть name
  release_date?: string; // У фильмов
  first_air_date?: string; // У сериалов
  poster_path?: string | null;
  backdrop_path?: string | null;
  media_type?: "movie" | "tv" | "person";
  adult?: boolean;
};

export type SupabaseBookmarkRecord = {
  media_id: number;
  media: MediaRecord; // `media` может быть null, если JOIN не нашел совпадения
};

export type MediaRecord = {
  id: number;
  title: string; // У фильмов есть title
  release_date: string; // У фильмов
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  adult: boolean;
};

export type PaginatedResponse = {
  page: number;
  results: ProductListType;
  totalPages: number;
  totalResults: number;
};

export type MediaType = "movie" | "tv" | "person";
