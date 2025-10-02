import { ProductCardType } from "@/lib/types";
import RegularProductList from "@/ui/dashboard/regular-product-list";

type Props = {
  allProducts: ProductCardType[]; // Принимает ВЕСЬ список продуктов
  searchParams: Promise<{ search: string }>;
};

export default async function BookmarkedContent({
  allProducts,
  searchParams,
}: Props) {
  const query = (await searchParams).search || "";

  // 2. Применяем поисковую фильтрацию к уже отфильтрованному списку закладок.
  const searchResults = allProducts.filter((product) =>
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
