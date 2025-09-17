import { ProductCardType } from "@/lib/types";
import IconBookmarkEmpty from "./icon-bookmark-empty";
import IconBookmarkFull from "./icon-bookmark-full";

type Props = {
  product: ProductCardType;
};

export default function ProductCardBookmarkedIcon({ product }: Props) {
  return (
    <button
      type="button"
      className="bg-background flex size-8 cursor-pointer items-center justify-center rounded-full text-white opacity-50 hover:bg-white hover:text-black hover:opacity-100"
    >
      {product.isBookmarked ? (
        <IconBookmarkFull className="" />
      ) : (
        <IconBookmarkEmpty className="" />
      )}
    </button>
  );
}
