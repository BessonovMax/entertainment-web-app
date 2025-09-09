"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/ui/dashboard/icons/HomeIcon";
import MoviesIcon from "@/ui/dashboard/icons/MoviesIcon";
import SeriesIcon from "@/ui/dashboard/icons/SeriesIcon";
import BookmarkedIcon from "@/ui/dashboard/icons/Bookmarked";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Movies",
    href: "/dashboard/movies",
    icon: MoviesIcon,
  },

  {
    name: "Tv-Series",
    href: "/dashboard/tv-series",
    icon: SeriesIcon,
  },
  {
    name: "Bookmarked",
    href: "/dashboard/bookmarked",
    icon: BookmarkedIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6 md:gap-8 lg:flex-col lg:gap-10">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-nav-item hover:text-foreground flex items-center justify-center",
              {
                "text-white": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="size-4 md:size-5" />
          </Link>
        );
      })}
    </div>
  );
}
