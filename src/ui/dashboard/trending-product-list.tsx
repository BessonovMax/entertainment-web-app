import { type ProductListType } from "@/lib/types";
import data from "@/data/data.json";
import TrendingProductCard from "./trending-product-card";

export default function TrendingProductList() {
  const trendingProducts: ProductListType = data.filter(
    (product) => product.isTrending,
  );
  return (
    <div className="flex gap-4 overflow-x-auto md:gap-10">
      {trendingProducts.map((product) => (
        <TrendingProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}
