import data from "@/data/data.json";
import { type ProductCardType } from "@/lib/types";

export function getTrendingProducts(): ProductCardType[] {
  return data.filter((product) => product.isTrending);
}

export function getRegularProducts(): ProductCardType[] {
  return data.filter((product) => !product.isTrending);
}

export function getProductsByCategory(category: string): ProductCardType[] {
  return data.filter((product) => product.category === category);
}

export function getBookmarkedProductsByCategory(
  category: "Movie" | "TV Series",
): ProductCardType[] {
  const bookmarkedProducts = data.filter((product) => product.isBookmarked);
  return bookmarkedProducts.filter((product) => product.category === category);
}
