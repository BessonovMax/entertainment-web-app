/* app/dashboard/page */
import HomeContent from "@/ui/dashboard/home-content";
import SearchInput from "@/ui/dashboard/search-input";
import { HomePageContentSkeleton } from "@/ui/dashboard/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        <SearchInput placeholder="Search for movies or TV series" />
        <Suspense fallback={<HomePageContentSkeleton />}>
          <HomeContent query={query} />
        </Suspense>
      </div>
    </>
  );
}
