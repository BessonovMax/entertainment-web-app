import { type ProductCardType } from "@/lib/types";
import CardInfo from "@/ui/dashboard/card-info";
import ProductCardBookmarkedIcon from "./bookmarked/ProductCardBookmarkedIcon";
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
      className={clsx("flex cursor-pointer flex-col gap-2", {
        "w-[15rem] shrink-0 md:w-[29.375rem]": isTrending,
        "w-[10.25rem] md:w-[13.75rem] lg:w-[17.5rem]": !isTrending,
      })}
    >
      <div
        className={clsx(
          `group grid grid-rows-3 rounded-[.5rem] [background-image:var(--bg-large)] bg-cover bg-no-repeat`,
          {
            "h-[8.75rem] px-4 py-[0.875rem] md:h-[14.375rem] md:px-6 md:py-[1.34375rem]":
              isTrending,
            "h-[14rem] bg-center p-2 md:h-[16rem] md:p-4 lg:h-[20rem]":
              !isTrending,
          },
        )}
        style={cardStyle as React.CSSProperties}
      >
        <div className="justify-self-end">
          <ProductCardBookmarkedIcon product={product} />
        </div>
        {isTrending && (
          <div className="row-start-3">
            <CardInfo product={product} isTrending={isTrending} />
          </div>
        )}
      </div>
      {!isTrending && <CardInfo product={product} />}
    </div>
  );
}
