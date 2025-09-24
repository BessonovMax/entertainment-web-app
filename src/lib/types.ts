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
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
};

export type ProductListType = ProductCardType[];

export type TmdbResult = {
  id: number;
  title?: string; // У фильмов есть title
  name?: string; // У сериалов есть name
  release_date?: string; // У фильмов
  first_air_date?: string; // У сериалов
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: "movie" | "tv";
  adult?: boolean;
};
