/* app/dashboard/movies/page */

import CategoryPage from "@/ui/dashboard/category-page";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";
  const media_variant = "movie";

  return <CategoryPage query={query} media_variant={media_variant} />;
}
