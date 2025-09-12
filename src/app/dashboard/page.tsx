import ProductCard from "@/ui/dashboard/product-card";
import data from "@/data/data.json";
import { type ProductCardType } from "@/lib/types";

export default function Page() {
  const regularProducts: ProductCardType[] = data.filter(
    (product) => !product.isTrending,
  );
  return (
    <div className="mx-4 grow md:mx-[1.5625rem] lg:mx-[2.25rem]">
      <div className="flex flex-col gap-6 md:gap-10">
        Search for movies or TV series Trending
        {/* <!-- Display trending shows --> */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Recommended for you
          </h2>
          {/* <!-- Display recommended shows --> */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
            {regularProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
