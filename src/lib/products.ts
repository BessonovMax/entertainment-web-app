import data from "@/data/data.json";
import { type ProductCardType } from "@/lib/types";

export function getTrendingProducts(): ProductCardType[] {
  return data.filter((product) => product.isTrending);
}

export function getRegularProducts(): ProductCardType[] {
  return data.filter((product) => !product.isTrending);
}

export function getProductsByCategory(
  category: "Movie" | "TV Series",
): ProductCardType[] {
  return data.filter((product) => product.category === category);
}

export function getBookmarkedProductsByCategory(
  category: "Movie" | "TV Series",
): ProductCardType[] {
  const bookmarkedProducts = data.filter((product) => product.isBookmarked);
  return bookmarkedProducts.filter((product) => product.category === category);
}

export function searchAllProducts(query: string): ProductCardType[] {
  // If the query is empty or just whitespace, return everything.
  if (!query || query.trim() === "") {
    return data;
  }

  const lowerCaseQuery = query.toLowerCase();

  return data.filter((product) =>
    product.title.toLowerCase().includes(lowerCaseQuery),
  );
}

export function searchBookmarkedProducts(query: string): ProductCardType[] {
  // If the query is empty or just whitespace, return all bookmarked products.
  if (!query || query.trim() === "") {
    return data.filter((product) => product.isBookmarked);
  }
  const lowerCaseQuery = query.toLowerCase();
  return data.filter(
    (product) =>
      product.isBookmarked &&
      product.title.toLowerCase().includes(lowerCaseQuery),
  );
}

export function searchProductsByCategory(
  query: string,
  category: "Movie" | "TV Series",
): ProductCardType[] {
  // If the query is empty or just whitespace, return everything in the category.
  if (!query || query.trim() === "") {
    return getProductsByCategory(category);
  }
  const lowerCaseQuery = query.toLowerCase();
  return data.filter(
    (product) =>
      product.category === category &&
      product.title.toLowerCase().includes(lowerCaseQuery),
  );
}
