import { searchBookmarkedProducts } from "@/lib/products";
import RegularProductList from "@/ui/dashboard/regular-product-list";
import SearchInput from "@/ui/dashboard/search-input";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  // Perform the search once on the server
  const filteredProducts = searchBookmarkedProducts(query);

  const bookmarkedMovies = filteredProducts.filter(
    (product) => product.isBookmarked && product.category === "Movie",
  );
  const bookmarkedTVSeries = filteredProducts.filter(
    (product) => product.isBookmarked && product.category === "TV Series",
  );

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for bookmarked shows" />
      {query ? (
        <div>
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Found {filteredProducts.length} results for &apos;
            {query}
            &apos;
          </h2>
          {/* Display all results in one list when searching */}
          <div className="mt-6">
            <RegularProductList products={filteredProducts} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Bookmarked Movies
            </h2>
            {bookmarkedMovies ? (
              <RegularProductList products={bookmarkedMovies} />
            ) : (
              <p>No bookmarked Movies found.</p>
            )}
          </div>
          {/* <!-- Display bookmarked movies --> */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Bookmarked TV Series
            </h2>
            {bookmarkedTVSeries ? (
              <RegularProductList products={bookmarkedTVSeries} />
            ) : (
              <p>No bookmarked TV series found.</p>
            )}
          </div>
          {/* <!-- Display bookmarked TV series --> */}
        </>
      )}
    </div>
  );
}
