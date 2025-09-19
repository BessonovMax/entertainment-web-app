"use client";
import { useBookmarks } from "@/context/BookmarkedContext";
import IconBookmarkEmpty from "@/ui/dashboard/bookmarked/icon-bookmark-empty";
import IconBookmarkFull from "@/ui/dashboard/bookmarked/icon-bookmark-full";

type Props = {
  title: string;
};

export default function ProductCardBookmarkedIcon({ title }: Props) {
  const { bookmarkedTitles, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarkedTitles.has(title);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(title)}
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
