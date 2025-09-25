import { createClient } from "@/lib/supabase/server";
import { getPopularMedia, searchMedia } from "@/lib/tmdb";
import { ProductCardType } from "@/lib/types";
import RegularProductList from "@/ui/dashboard/regular-product-list";
import SearchInput from "@/ui/dashboard/search-input";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";
  const media_type = "movie";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const response = await searchMedia(query, 1, media_type);
  const searchedProducts = response.results;
  const totalSearchPages = response.totalPages;
  const totalSearchResults = response.totalResults;

  // Perform the search once on the server

  const addUserId = (p: ProductCardType) => ({ ...p, userId: user.id });
  const movies = await getPopularMedia(1, media_type);
  const moviesWithUser = movies.map(addUserId);

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for movies" />
      {query ? (
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
              media_type="movie"
              initialProducts={searchedProducts}
            />
          </div>
        </div>
      ) : (
        <>
          {/* <!-- Display all movies --> */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Movies
            </h2>
            {/* <!-- Display recommended shows --> */}
            <RegularProductList
              media_type="movie"
              initialProducts={moviesWithUser}
            />
          </div>
        </>
      )}
    </div>
  );
}
