import RegularProductList from "@/ui/dashboard/regular-product-list";
import { getUserBookmarkedMedia } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

type Props = {
  searchParams: Promise<{ search: string }>;
};

export default async function BookmarkedContent({ searchParams }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const getCachedBookmarkedIds = unstable_cache(
    async () => {
      return getUserBookmarkedMedia(supabase, user);
    },
    ["user-bookmarks-media", user.id], // Cache key: unique string + user ID
    {
      tags: [`bookmarks-media:${user.id}`], // Tags for on-demand revalidation
      revalidate: 60, // Optional: Revalidate every 60 seconds
    },
  );

  const bookmarkedMedia = await getCachedBookmarkedIds();

  const bookmarkedWithUser = bookmarkedMedia.map((p) => ({
    ...p,
    userId: user.id,
    isBookmarked: true,
  }));

  const query = (await searchParams).search || "";

  // 2. Применяем поисковую фильтрацию к уже отфильтрованному списку закладок.
  const searchResults = bookmarkedWithUser.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  const isBookmarkList = true;

  // 3. Разделяем результаты на категории, как вы и делали.
  const bookmarkedMovies = searchResults.filter(
    (product) => product.category === "Movie",
  );
  const bookmarkedTVSeries = searchResults.filter(
    (product) => product.category === "TV Series",
  );

  return (
    <>
      {query ? (
        <div>
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Found {searchResults.length} results for &apos;
            {query}
            &apos;
          </h2>
          {/* Display all results in one list when searching */}
          <div className="mt-6">
            <RegularProductList
              isBookmarkList={isBookmarkList}
              initialProducts={searchResults}
              query={query}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Bookmarked Movies
            </h2>
            {bookmarkedMovies.length === 0 ? (
              <p>No bookmarked Movies found.</p>
            ) : (
              <RegularProductList
                isBookmarkList={isBookmarkList}
                initialProducts={bookmarkedMovies}
                query={query}
              />
            )}
          </div>
          {/* <!-- Display bookmarked movies --> */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
              Bookmarked TV Series
            </h2>
            {bookmarkedTVSeries.length === 0 ? (
              <p>No bookmarked TV series found.</p>
            ) : (
              <RegularProductList
                isBookmarkList={isBookmarkList}
                initialProducts={bookmarkedTVSeries}
                query={query}
              />
            )}
          </div>
          {/* <!-- Display bookmarked TV series --> */}
        </>
      )}
    </>
  );
}
