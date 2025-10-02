const shimmer =
  "before:absolute before:inset-0 before:-translate-y-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-b before:from-transparent before:via-movie-card/40 before:to-transparent";

export function ProductCardSkeleton() {
  return (
    <div className="flex w-[10.25rem] flex-col gap-2 md:w-[13.75rem] lg:w-[17.5rem]">
      <div
        className={`${shimmer} bg-card-background relative h-[14rem] overflow-hidden rounded-[.5rem] md:h-[16rem] lg:h-[20rem]`}
      ></div>
      <div className="flex flex-col gap-2">
        <div
          className={`bg-card-background ${shimmer} relative flex h-[13.75px] items-center justify-start gap-2 overflow-hidden rounded-[.3rem] md:h-[16.26px]`}
        ></div>
        <div
          className={`bg-card-background ${shimmer} relative h-[17.5px] overflow-hidden rounded-[.3rem] md:h-[22.51px]`}
        ></div>
      </div>
    </div>
  );
}
export function TrendingCardSkeleton() {
  return (
    <div
      className={`bg-card-background ${shimmer} relative h-[8.75rem] w-[15rem] shrink-0 gap-2 overflow-hidden rounded-[.5rem] md:h-[14.375rem] md:w-[29.375rem]`}
    ></div>
  );
}

export function RegularProductListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
export function TrendingProductListSkeleton() {
  return (
    <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2 md:gap-10">
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
      <TrendingCardSkeleton />
    </div>
  );
}

export function CategoryPageContentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Movies
        </h2>
        {/* <!-- Display recommended shows --> */}
        <RegularProductListSkeleton />
      </div>
    </>
  );
}

export function MoviePageSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex items-center gap-4 rounded-md md:gap-6 lg:gap-8">
        <svg
          className="size-6 self-start md:size-8"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#fff"
          />{" "}
        </svg>

        <input
          placeholder="Search for movies"
          className="placeholder-login-card caret-foreground w-full border-b border-transparent pb-2.5 font-light text-white focus:border-gray-500 focus:outline-none md:text-2xl"
        />
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Movies
        </h2>
        {/* <!-- Display recommended shows --> */}
        <RegularProductListSkeleton />
      </div>
    </div>
  );
}
export function TVPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex items-center gap-4 rounded-md md:gap-6 lg:gap-8">
        <svg
          className="size-6 self-start md:size-8"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#fff"
          />{" "}
        </svg>

        <input
          placeholder="Search for TV series"
          className="placeholder-login-card caret-foreground w-full border-b border-transparent pb-2.5 font-light text-white focus:border-gray-500 focus:outline-none md:text-2xl"
        />
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          TV Series
        </h2>
        {/* <!-- Display recommended shows --> */}
        <RegularProductListSkeleton />
      </div>
    </div>
  );
}

export function HomePageContentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Trending
        </h2>
        <TrendingProductListSkeleton />
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
          Popular
        </h2>
        <RegularProductListSkeleton />
      </div>
    </>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex items-center gap-4 rounded-md md:gap-6 lg:gap-8">
        <svg
          className="size-6 self-start md:size-8"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#fff"
          />{" "}
        </svg>

        <input
          placeholder="Search for movies or TV series"
          className="placeholder-login-card caret-foreground w-full border-b border-transparent pb-2.5 font-light text-white focus:border-gray-500 focus:outline-none md:text-2xl"
        />
      </div>
      <HomePageContentSkeleton />
    </div>
  );
}

export function BookmarkPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex items-center gap-4 rounded-md md:gap-6 lg:gap-8">
        <svg
          className="size-6 self-start md:size-8"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#fff"
          />{" "}
        </svg>

        <input
          placeholder="Search for bookmarked shows"
          className="placeholder-login-card caret-foreground w-full border-b border-transparent pb-2.5 font-light text-white focus:border-gray-500 focus:outline-none md:text-2xl"
        />
      </div>
      <>
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Bookmarked Movies
          </h2>

          <BookmarkedProductListSkeleton />
        </div>
        {/* <!-- Display bookmarked movies --> */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Bookmarked TV Series
          </h2>

          <BookmarkedProductListSkeleton />
        </div>
        {/* <!-- Display bookmarked TV series --> */}
      </>
    </div>
  );
}

export function BookmarkedProductListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
