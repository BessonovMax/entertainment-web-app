import data from "@/data/data.json";
import { ProductListType } from "@/lib/types";
import ProductList from "@/ui/dashboard/product-list";

export default function Page() {
  const regularProducts: ProductListType = data.filter(
    (product) => !product.isTrending,
  );
  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        Search for movies or TV series Trending
        {/* <!-- Display trending shows --> */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Recommended for you
          </h2>
          {/* <!-- Display recommended shows --> */}
          <ProductList products={regularProducts} />
        </div>
      </div>
    </>
  );
}
