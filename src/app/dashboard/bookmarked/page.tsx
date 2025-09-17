import { getBookmarkedProductsByCategory } from "@/lib/products";
import RegularProductList from "@/ui/dashboard/regular-product-list";

export default function Page() {
  const bookmarkedMovies = getBookmarkedProductsByCategory("Movie");
  const bookmarkedTVSeries = getBookmarkedProductsByCategory("TV Series");
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      Search for bookmarked shows
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Bookmarked Movies
        </h2>
        {bookmarkedMovies ? (
          <RegularProductList products={bookmarkedMovies} />
        ) : (
          <p>No bookmarked Movies found.</p>
        )}
      </div>
      {/* <!-- Display bookmarked movies --> */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Bookmarked TV Series
        </h2>
        {bookmarkedTVSeries ? (
          <RegularProductList products={bookmarkedTVSeries} />
        ) : (
          <p>No bookmarked TV series found.</p>
        )}
      </div>
      {/* <!-- Display bookmarked TV series --> */}
    </div>
  );
}
