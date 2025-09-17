"use client";
import { type ProductListType } from "@/lib/types";
import TrendingProductCard from "./trending-product-card";
import { useWheelScroll } from "@/lib/hooks/useWheelScroll";

type Props = {
  trendingProducts: ProductListType;
};

export default function TrendingProductList({ trendingProducts }: Props) {
  const scrollRef = useWheelScroll<HTMLDivElement>();
  return (
    <div
      ref={scrollRef}
      className="scrollbar-thin flex gap-4 overflow-x-auto md:gap-10"
    >
      {trendingProducts.map((product) => (
        <TrendingProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}
