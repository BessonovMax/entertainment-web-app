"use client";
import { addBookmark, removeBookmark, upsertMedia } from "@/app/actions";
import { ProductCardType } from "@/lib/types";
import IconBookmarkEmpty from "@/ui/dashboard/bookmarked/icon-bookmark-empty";
import IconBookmarkFull from "@/ui/dashboard/bookmarked/icon-bookmark-full";
import { useState } from "react";

type Props = {
  product: ProductCardType;
};

export default function ProductCardBookmarkedIcon({ product }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(product.isBookmarked);
  const userId = product.userId ?? "";

  const handleToggle = async () => {
    const currentlyBookmarked = isBookmarked;
    setIsBookmarked(!currentlyBookmarked); // Оптимистичное обновление UI

    if (currentlyBookmarked) {
      // Удаляем закладку
      await removeBookmark(userId, product.id);
    } else {
      // 1. Кэшируем детали медиафайла в нашей DB.
      await upsertMedia(product);
      console.log(product.media_type);
      // 2. Добавляем закладку
      await addBookmark(userId, product.id, product.media_type ?? "movie");
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`bg-bookmarked-background flex size-8 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white hover:text-black`}
    >
      {isBookmarked ? (
        <IconBookmarkFull className="" />
      ) : (
        <IconBookmarkEmpty className="" />
      )}
    </button>
  );
}
