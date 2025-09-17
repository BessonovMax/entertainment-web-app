import { type ProductListType } from "@/lib/types";
import ProductCard from "@/ui/dashboard/product-card";

type Props = {
  products: ProductListType;
};

export default function RegularProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
      {products.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
    </div>
  );
}
