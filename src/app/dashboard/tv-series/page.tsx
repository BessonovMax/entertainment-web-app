import { searchProductsByCategory } from "@/lib/products";
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
  const series = searchProductsByCategory(query, "TV Series");

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for TV Series" />
      {query ? (
        <div>
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Found {series.length} results for &apos;
            {query}
            &apos;
          </h2>
          {/* Display all results in one list when searching */}
          <div className="mt-6">
            <RegularProductList products={series} />
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
            <RegularProductList products={series} />
          </div>
        </>
      )}
    </div>
  );
}
