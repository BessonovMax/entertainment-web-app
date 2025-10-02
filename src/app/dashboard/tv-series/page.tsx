/* app/dashboard/tv-series/page */

import CategoryPage from "@/ui/dashboard/category-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const media_variant = "tv";

  return (
    <CategoryPage searchParams={searchParams} media_variant={media_variant} />
  );
}
