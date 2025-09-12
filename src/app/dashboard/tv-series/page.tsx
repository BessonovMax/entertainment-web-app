import { ProductListType } from "@/lib/types";
import ProductList from "@/ui/dashboard/product-list";
import data from "@/data/data.json";

export default function Page() {
  const movieProducts: ProductListType = data.filter((product) =>
    product.category.includes("TV Series"),
  );

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      Search for TV Series
      {/* <!-- Display all movies --> */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          TV Series
        </h2>
        {/* <!-- Display recommended shows --> */}
        <ProductList products={movieProducts} />
      </div>
    </div>
  );
}
