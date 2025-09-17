import { ProductCardType } from "@/lib/types";
import Image from "next/image";

type Props = {
  product: ProductCardType;
  isTrending?: boolean;
};

export default function CardInfo({ product, isTrending }: Props) {
  const icons = {
    Movie: "/icons/icon-category-movie.svg",
    "TV Series": "/icons/icon-category-tv.svg",
  } as const;

  const iconSrc = icons[product.category as keyof typeof icons];
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${isTrending ? "text-[0.75rem] md:text-[0.9375rem]" : "text-[0.6875rem] md:text-[0.8125rem]"} text-movie-card flex items-center justify-start gap-2 leading-[125%] font-light`}
      >
        <div>{product.year}</div>
        <div className="flex items-center gap-2 before:content-['•'] after:content-['•']">
          <div
            className={`relative ${isTrending ? "size-[12px]" : "size-[10px]"} md:size-[12px]`}
          >
            <Image
              className="object-contain"
              fill
              alt={`${product.category} icon`}
              src={iconSrc}
            />
          </div>
          <div>{product.category}</div>
        </div>
        <div>{product.rating}</div>
      </div>
      <div
        className={`${isTrending ? "text-[0.9375rem] md:text-[1.5rem]" : "text-[0.875rem] md:text-[1.125rem]"} leading-[125%] font-medium`}
      >
        {product.title}
      </div>
    </div>
  );
}
