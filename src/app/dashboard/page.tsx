/* app/dashboard/page */
import HomeContent from "@/ui/dashboard/home-content";
import SearchInput from "@/ui/dashboard/search-input";
import { HomePageSkeleton } from "@/ui/dashboard/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        <Suspense fallback={<HomePageSkeleton />}>
          <SearchInput placeholder="Search for movies or TV series" />
          <HomeContent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
