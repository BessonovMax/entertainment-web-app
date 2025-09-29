/* app/dashboard/tv-series/page */

import CategoryPage from "@/ui/dashboard/category-page";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";
  const media_variant = "tv";

  return <CategoryPage query={query} media_variant={media_variant} />;
}
