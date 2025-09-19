import SideNav from "@/ui/dashboard/SideNav";
import data from "@/data/data.json";
import { BookmarkedProvider } from "@/context/BookmarkedContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const initiallyBookmarked = data.filter((item) => item.isBookmarked);

  const initialBookmarkTitles = initiallyBookmarked.map((item) => item.title);

  return (
    <BookmarkedProvider initialBookmarkedTitles={initialBookmarkTitles}>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:justify-center lg:py-8 lg:pl-8">
          <SideNav />
        </div>

        <div className="mx-4 my-6 md:mx-[1.5625rem] md:my-8 lg:mx-[2.25rem] lg:my-16 lg:min-w-0 lg:flex-1">
          {children}
        </div>
      </div>
    </BookmarkedProvider>
  );
}
