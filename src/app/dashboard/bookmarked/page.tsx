import { getUserBookmarkedMedia } from "@/lib/supabase/data";
import { createClient } from "@/lib/supabase/server";
import BookmarkedContent from "@/ui/dashboard/bookmarked/bookmarked-content";
import SearchInput from "@/ui/dashboard/search-input";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const bookmarkedMedia = await getUserBookmarkedMedia();

  const bookmarkedWithUser = bookmarkedMedia.map((p) => ({
    ...p,
    userId: user.id,
    isBookmarked: true,
  }));

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <SearchInput placeholder="Search for bookmarked shows" />
      <BookmarkedContent allProducts={bookmarkedWithUser} query={query} />
    </div>
  );
}
