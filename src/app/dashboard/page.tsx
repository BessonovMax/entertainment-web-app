import RegularProductList from "@/ui/dashboard/regular-product-list";
import TrendingProductList from "@/ui/dashboard/trending-product-list";
import { searchAllProducts } from "@/lib/products";
import SearchInput from "@/ui/dashboard/search-input";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  // Perform the search once on the server
  const filteredProducts = searchAllProducts(query);

  const trendingProducts = filteredProducts.filter(
    (product) => product.isTrending,
  );
  const regularProducts = filteredProducts.filter(
    (product) => !product.isTrending,
  );

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        <SearchInput placeholder="Search for movies or TV series" />
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
                Trending
              </h2>
              <TrendingProductList trendingProducts={trendingProducts} />
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
                Recommended for you
              </h2>
              <RegularProductList products={regularProducts} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
