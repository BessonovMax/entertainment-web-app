"use client";

import { fetchMoreMedia, searchMoreMedia } from "@/app/actions";
import { type ProductListType } from "@/lib/types";
import ProductCard from "@/ui/dashboard/product-card";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

type Props = {
  initialProducts: ProductListType;
  media_variant?: "movie" | "tv" | "multi";
  totalPages?: number;
  isBookmarkList?: boolean;
  bookmarkedIds: Set<number>;
};

export default function RegularProductList({
  initialProducts,
  media_variant = "multi",
  totalPages = 10,
  isBookmarkList,
  bookmarkedIds,
}: Props) {
  const [products, setProducts] = useState<ProductListType>(initialProducts);
  const [page, setPage] = useState(2); // The next page to fetch is page 2
  const [isLoading, setIsLoading] = useState(false);

  const [displayedProductIds, setDisplayedProductIds] = useState(
    new Set(initialProducts.map((p) => p.id)),
  );

  const searchParams = useSearchParams();

  const query = searchParams?.get("search") || "";

  // To avoid duplicates when loading more products
  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    // Determine which fetch function to call on Load More based on mediaType
    let moreProducts: ProductListType = await fetchMoreMedia(
      page,
      media_variant,
      bookmarkedIds,
    );

    if (query) {
      // If there's a search query, fetch more search results
      const response = await searchMoreMedia(
        query,
        page,
        media_variant,
        bookmarkedIds,
      );
      moreProducts = response.results;
    }
    // media products from tmdb api come doubled sometime, so there is a need to check products for this case
    if (moreProducts.length > 0) {
      const uniqueNewProducts: ProductListType = [];
      const newDisplayedIds = new Set(displayedProductIds);

      for (const product of moreProducts) {
        if (!newDisplayedIds.has(product.id)) {
          uniqueNewProducts.push(product);
          newDisplayedIds.add(product.id);
        }
      }

      setPage((prevPage) => prevPage + 1);
      setProducts((prevProducts) => [...prevProducts, ...uniqueNewProducts]);
      setDisplayedProductIds(newDisplayedIds);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, displayedProductIds]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10.25rem,1fr))] gap-x-[15px] gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] md:gap-x-[30px] md:gap-y-6 lg:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] lg:gap-x-[40px]">
        {products.length === 0 && (
          <p className="mt-4 text-center text-gray-500">No results found.</p>
        )}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {page <= totalPages && !isBookmarkList && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMoreProducts}
            disabled={isLoading}
            className="bg-foreground hover:text-background cursor-pointer rounded-sm px-6 py-3 text-xl font-medium text-white transition hover:bg-white disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
