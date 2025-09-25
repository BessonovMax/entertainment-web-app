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
  const media_type = "tv";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const response = await searchMedia(query, 1, media_type);
  const searchedProducts = response.results;
  const totalPages = response.totalPages;
  const totalResults = response.totalResults;

  const addUserId = (p: ProductCardType) => ({ ...p, userId: user.id });
  const series = await getPopularMedia(1, media_type);
  const seriesWithUser = series.map(addUserId);

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for TV Series" />
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
          {/* <!-- Display all movies --> */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              TV Series
            </h2>
            {/* <!-- Display recommended shows --> */}
            <RegularProductList
              media_type={media_type}
              initialProducts={seriesWithUser}
            />
          </div>
        </>
      )}
    </div>
  );
}
