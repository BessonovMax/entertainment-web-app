/* app/dashboard/bookmarked/page */

import BookmarkedContent from "@/ui/dashboard/bookmarked/bookmarked-content";
import SearchInput from "@/ui/dashboard/search-input";
import { BookmarkPageSkeleton } from "@/ui/dashboard/skeletons";

import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <Suspense fallback={<BookmarkPageSkeleton />}>
        <SearchInput placeholder="Search for bookmarked shows" />
        <BookmarkedContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
