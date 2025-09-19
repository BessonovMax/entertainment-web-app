"use client";
import { type ProductListType } from "@/lib/types";
import ProductCard from "./product-card";
import { useWheelScroll } from "@/lib/hooks/useWheelScroll";

type Props = {
  trendingProducts: ProductListType;
};

export default function TrendingProductList({ trendingProducts }: Props) {
  const scrollRef = useWheelScroll<HTMLDivElement>();
  const isTrendingProduct = true;
  return (
    <div
      ref={scrollRef}
      className="scrollbar-thin flex gap-4 overflow-x-auto pb-2 md:gap-10"
    >
      {trendingProducts.map((product) => (
        <ProductCard
          key={product.title}
          product={product}
          isTrendingProduct={isTrendingProduct}
        />
      ))}
    </div>
  );
}
