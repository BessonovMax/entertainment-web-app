import SearchInput from "@/ui/dashboard/search-input";
import CategoryPageContent from "@/ui/dashboard/category-page-content";
import { Suspense } from "react";
import { MoviePageSkeleton, TVPageSkeleton } from "@/ui/dashboard/skeletons";

type Props = {
  media_variant: "movie" | "tv" | "multi";
  searchParams: Promise<{ search: string }>;
};

export default async function CategoryPage({
  searchParams,
  media_variant,
}: Props) {
  const categotyData = {
    movie: {
      placeholder: "Search for movies",
      title: "Movies",
    },
    tv: {
      placeholder: "Search for TV series",
      title: "TV Series",
    },
    multi: { placeholder: "", title: "" },
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <Suspense
        fallback={
          media_variant === "movie" ? <MoviePageSkeleton /> : <TVPageSkeleton />
        }
      >
        <SearchInput placeholder={categotyData[media_variant].placeholder} />
        <CategoryPageContent
          searchParams={searchParams}
          media_variant={media_variant}
          title={categotyData[media_variant].title}
        />
      </Suspense>
    </div>
  );
}
