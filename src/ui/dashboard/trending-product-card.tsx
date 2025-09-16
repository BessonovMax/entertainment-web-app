import { type ProductCardType } from "@/lib/types";
import CardInfo from "@/ui/dashboard/card-info";

export default function TrendingProductCard(product: ProductCardType) {
  const { large } =
    product.isTrending && product.thumbnail.trending
      ? product.thumbnail.trending
      : product.thumbnail.regular;

  const cardStyle = {
    "--bg-large": `url(${large})`,
  };

  return (
    <div className="flex w-[15rem] shrink-0 flex-col gap-2 md:w-[29.375rem]">
      <div
        className={`flex h-[8.75rem] items-end rounded-[.5rem] [background-image:var(--bg-large)] bg-cover bg-no-repeat px-4 py-[0.875rem] md:h-[14.375rem] md:px-6 md:py-[1.34375rem]`}
        style={cardStyle as React.CSSProperties}
      >
        <CardInfo {...product} />
      </div>
    </div>
  );
}
