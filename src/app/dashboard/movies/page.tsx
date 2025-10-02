/* app/dashboard/movies/page */

import CategoryPage from "@/ui/dashboard/category-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const media_variant = "movie";

  return (
    <CategoryPage searchParams={searchParams} media_variant={media_variant} />
  );
}
