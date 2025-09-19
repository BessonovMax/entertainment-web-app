import { getAllProducts } from "@/lib/products";
import BookmarkedContent from "@/ui/dashboard/bookmarked/bookmarked-content";
import SearchInput from "@/ui/dashboard/search-input";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  // Perform the search once on the server
  const allProducts = getAllProducts();

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for bookmarked shows" />
      <BookmarkedContent allProducts={allProducts} query={query} />
    </div>
  );
}
