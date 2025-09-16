import { type ProductListType } from "@/lib/types";
import RegularProductCard from "@/ui/dashboard/regular-product-card";
import data from "@/data/data.json";

export default function RegularProductList() {
  const regularProducts: ProductListType = data.filter(
    (product) => !product.isTrending,
  );
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
      {regularProducts.map((product) => (
        <RegularProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}
