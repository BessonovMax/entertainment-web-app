import { getUserBookmarkedIds } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import { getPopularMedia, searchMedia } from "@/lib/tmdb";
import { ProductCardType } from "@/lib/types";
import RegularProductList from "@/ui/dashboard/regular-product-list";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ search: string }>;
  media_variant: "movie" | "tv" | "multi";
  title: string;
};

export default async function CategoryPageContent({
  searchParams,
  media_variant,
  title,
}: Props) {
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

  const response = await searchMedia(query, 1, media_variant, bookmarkedIds);
  const searchedProducts = response.results;
  const totalSearchPages = response.totalPages;
  const totalSearchResults = response.totalResults;

  // Perform the search once on the server

  const addUserId = (p: ProductCardType) => ({ ...p, userId: user.id });
  const movies = await getPopularMedia(1, media_variant, bookmarkedIds);
  const moviesWithUser = movies.map(addUserId);

  return query ? (
    <div>
      <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
        Found {totalSearchResults} results for &apos;
        {query}
        &apos;
      </h2>
      {/* Display all results in one list when searching */}
      <div className="mt-6">
        <RegularProductList
          totalPages={totalSearchPages}
          media_variant={media_variant}
          initialProducts={searchedProducts}
          bookmarkedIds={bookmarkedIds}
          searchParams={searchParams}
        />
      </div>
    </div>
  ) : (
    <>
      {/* <!-- Display all movies --> */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          {title}
        </h2>
        {/* <!-- Display recommended shows --> */}
        <RegularProductList
          media_variant={media_variant}
          initialProducts={moviesWithUser}
          bookmarkedIds={bookmarkedIds}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
