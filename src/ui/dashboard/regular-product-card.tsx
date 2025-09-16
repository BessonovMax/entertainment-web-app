import { type ProductCardType } from "@/lib/types";
import CardInfo from "@/ui/dashboard/card-info";

export default function RegularProductCard(product: ProductCardType) {
  const { large } = product.thumbnail.regular;

  const cardStyle = {
    "--bg-large": `url(${large})`,
  };

  return (
    <div className="flex w-[10.25rem] flex-col gap-2 md:w-[13.75rem] lg:w-[17.5rem]">
      <div
        className={`h-[6.875rem] rounded-[.5rem] [background-image:var(--bg-large)] bg-cover bg-no-repeat md:h-[8.75rem] lg:h-[10.875rem]`}
        style={cardStyle as React.CSSProperties}
      ></div>
      <CardInfo {...product} />
    </div>
  );
}
