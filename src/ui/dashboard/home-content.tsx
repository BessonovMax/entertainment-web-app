import RegularProductList from "@/ui/dashboard/regular-product-list";
import TrendingProductList from "@/ui/dashboard/trending-product-list";

import { getPopularMedia, getTrendingMedia, searchMedia } from "@/lib/tmdb";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProductCardType } from "@/lib/types";
import { getUserBookmarkedIds } from "@/lib/supabase/data";
import { unstable_cache } from "next/cache";

type Props = {
  searchParams: Promise<{ search: string }>;
};

export default async function HomeContent({ searchParams }: Props) {
  const query = (await searchParams).search || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const getCachedBookmarkedIds = unstable_cache(
    async () => {
      return getUserBookmarkedIds(supabase, user);
    },
    ["user-bookmarks", user.id], // Cache key: unique string + user ID
    {
      tags: [`bookmarks:${user.id}`], // Tags for on-demand revalidation
      revalidate: 60, // Optional: Revalidate every 60 seconds
    },
  );

  const bookmarkedIdsFromCache = await getCachedBookmarkedIds();

  // THE FIX: We must convert the Array returned by the cache back into a Set.
  const bookmarkedIds = new Set(bookmarkedIdsFromCache);

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

  return query ? (
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
          query={query}
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
          query={query}
        />
      </div>
    </>
  );
}
