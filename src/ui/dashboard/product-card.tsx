import { type ProductCardType } from "@/lib/types";
import CardInfo from "@/ui/dashboard/card-info";
import ProductCardBookmarkedIcon from "./icons/ProductCardBookmarkedIcon";
import clsx from "clsx";

type Props = {
  product: ProductCardType;
  isTrendingProduct?: boolean;
};

export default function ProductCard({ product, isTrendingProduct }: Props) {
  const isTrending = product.isTrending && isTrendingProduct;

  const { large } =
    isTrending && product.thumbnail.trending
      ? product.thumbnail.trending
      : product.thumbnail.regular;

  const cardStyle = {
    "--bg-large": `url(${large})`,
  };

  return (
    <div
      className={clsx("flex flex-col gap-2", {
        "w-[15rem] shrink-0 md:w-[29.375rem]": isTrending,
        "w-[10.25rem] md:w-[13.75rem] lg:w-[17.5rem]": !isTrending,
      })}
    >
      <div
        className={clsx(
          `flex flex-col rounded-[.5rem] [background-image:var(--bg-large)] bg-cover bg-no-repeat`,
          {
            "h-[8.75rem] justify-between px-4 py-[0.875rem] md:h-[14.375rem] md:px-6 md:py-[1.34375rem]":
              isTrending,
            "h-[6.875rem] p-2 md:h-[8.75rem] md:p-4 lg:h-[10.875rem]":
              !isTrending,
          },
        )}
        style={cardStyle as React.CSSProperties}
      >
        <div className="self-end">
          <ProductCardBookmarkedIcon product={product} />
        </div>
        {isTrending && <CardInfo {...product} />}
      </div>
      {!isTrending && <CardInfo {...product} />}
    </div>
  );
}
