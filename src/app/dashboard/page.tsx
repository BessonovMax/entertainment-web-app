import RegularProductList from "@/ui/dashboard/regular-product-list";
import TrendingProductList from "@/ui/dashboard/trending-product-list";

import SearchInput from "@/ui/dashboard/search-input";
import { getPopularMedia, getTrendingMedia, searchMedia } from "@/lib/tmdb";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";
  const media_type = "multi";

  const response = await searchMedia(query, 1, media_type);
  const searchedProducts = response.results;
  const totalPages = response.totalPages;
  const totalResults = response.totalResults;

  const [trendingProducts, regularProducts] = await Promise.all([
    getTrendingMedia(),
    getPopularMedia(1, media_type), // Используем популярные фильмы как "рекомендованные"
  ]);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        <SearchInput placeholder="Search for movies or TV series" />
        {query ? (
          <div>
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Found {totalResults} results for &apos;
              {query}
              &apos;
            </h2>
            {/* Display all results in one list when searching */}

            <div className="mt-6">
              <RegularProductList
                totalPages={totalPages}
                media_type={media_type}
                initialProducts={searchedProducts}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
                Trending
              </h2>
              <TrendingProductList trendingProducts={trendingProducts} />
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
                Popular
              </h2>
              <RegularProductList
                media_type={media_type}
                initialProducts={regularProducts}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
