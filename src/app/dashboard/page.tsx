/* app/dashboard/page */
import RegularProductList from "@/ui/dashboard/regular-product-list";
import TrendingProductList from "@/ui/dashboard/trending-product-list";

import SearchInput from "@/ui/dashboard/search-input";
import { getPopularMedia, getTrendingMedia, searchMedia } from "@/lib/tmdb";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProductCardType } from "@/lib/types";
import { getUserBookmarkedIds } from "@/lib/supabase/data";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const bookmarkedIds = await getUserBookmarkedIds(user);

  const media_variant = "multi";

  const response = await searchMedia(query, 1, media_variant, bookmarkedIds);
  const searchedProducts = response.results;
  const totalPages = response.totalPages;
  const totalResults = response.totalResults;

  const [trendingProducts, regularProducts] = await Promise.all([
    getTrendingMedia(bookmarkedIds),
    getPopularMedia(1, media_variant, bookmarkedIds),
  ]);

  const addUserId = (p: ProductCardType) => ({ ...p, userId: user.id });
  const trendingWithUser = trendingProducts.map(addUserId);
  const regularWithUser = regularProducts.map(addUserId);

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
                media_variant={media_variant}
                initialProducts={searchedProducts}
                bookmarkedIds={bookmarkedIds}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
                Trending
              </h2>
              <TrendingProductList trendingProducts={trendingWithUser} />
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
                Popular
              </h2>
              <RegularProductList
                media_variant={media_variant}
                initialProducts={regularWithUser}
                bookmarkedIds={bookmarkedIds}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
