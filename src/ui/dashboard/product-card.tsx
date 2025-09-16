import { type ProductCardType } from "@/lib/types";
import Image from "next/image";

type Props = {
  product: ProductCardType;
};

export default function ProductCard({ product }: Props) {
  /*   const isTrending = product.isTrending;*/
  const { small, medium, large } = product.thumbnail.regular;

  const cardStyle = {
    "--bg-small": `url(${small})`,
    "--bg-medium": `url(${medium})`,
    "--bg-large": `url(${large})`,
  };

  const icons = {
    Movie: "/icons/icon-category-movie.svg",
    "TV Series": "/icons/icon-category-tv.svg",
  } as const;

  const iconSrc = icons[product.category as keyof typeof icons];

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-[6.875rem] w-[10.25rem] rounded-[.5rem] [background-image:var(--bg-small)] bg-contain md:h-[8.75rem] md:w-[13.75rem] md:[background-image:var(--bg-medium)] lg:h-[10.875rem] lg:w-[17.5rem] lg:[background-image:var(--bg-large)]`}
        style={cardStyle as React.CSSProperties}
      ></div>
      <div className="flex flex-col gap-2">
        <div className="text-movie-card flex items-center justify-start gap-2 text-[0.6875rem] leading-[125%] font-light md:text-[0.8125rem]">
          <div>{product.year}</div>
          <div className="flex items-center gap-2 before:mx-2 before:content-['•'] after:mx-2 after:content-['•']">
            <div className="relative size-[10px] md:size-[12px]">
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
        <div className="text-[0.875rem] leading-[125%] font-medium md:text-[1.125rem]">
          {product.title}
        </div>
      </div>
    </div>
  );
}
