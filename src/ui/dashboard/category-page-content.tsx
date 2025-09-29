import { getUserBookmarkedIds } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import { getPopularMedia, searchMedia } from "@/lib/tmdb";
import { ProductCardType } from "@/lib/types";
import RegularProductList from "@/ui/dashboard/regular-product-list";
import { redirect } from "next/navigation";

type Props = {
  query: string;
  media_variant: "movie" | "tv" | "multi";
  title: string;
};

export default async function CategoryPageContent({
  query,
  media_variant,
  title,
}: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const bookmarkedIds = await getUserBookmarkedIds(supabase, user);

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
        />
      </div>
    </>
  );
}
