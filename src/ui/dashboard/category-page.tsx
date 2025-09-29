import SearchInput from "@/ui/dashboard/search-input";
import CategoryPageContent from "./category-page-content";
import { Suspense } from "react";
import { CategoryPageContentSkeleton } from "./skeletons";

type Props = {
  query: string;
  media_variant: "movie" | "tv" | "multi";
};

export default async function CategoryPage({ query, media_variant }: Props) {
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
      <SearchInput placeholder={categotyData[media_variant].placeholder} />
      <Suspense fallback={<CategoryPageContentSkeleton />}>
        <CategoryPageContent
          query={query}
          media_variant={media_variant}
          title={categotyData[media_variant].title}
        />
      </Suspense>
    </div>
  );
}
