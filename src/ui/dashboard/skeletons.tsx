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
        <h2 className="h-[25px] md:h-[40px]"></h2>
        {/* <!-- Display recommended shows --> */}
        <RegularProductListSkeleton />
      </div>
    </>
  );
}

export function HomePageContentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="h-[25px] md:h-[40px]"></h2>
        <TrendingProductListSkeleton />
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 className="h-[25px] md:h-[40px]"></h2>
        <RegularProductListSkeleton />
      </div>
    </>
  );
}
