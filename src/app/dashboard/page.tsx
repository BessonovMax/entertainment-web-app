import RegularProductList from "@/ui/dashboard/regular-product-list";

import TrendingProductList from "@/ui/dashboard/trending-product-list";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        Search for movies or TV series Trending
        {/* <!-- Display trending shows --> */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Trending
          </h2>
          <TrendingProductList />
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[1.25rem] leading-[125%] font-light tracking-[-0.3px] md:text-[2rem] md:tracking-[-0.5px]">
            Recommended for you
          </h2>
          {/* <!-- Display recommended shows --> */}
          <RegularProductList />
        </div>
      </div>
    </>
  );
}
