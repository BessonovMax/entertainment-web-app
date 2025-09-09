"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: "/icons/icon-nav-home.svg" },
  {
    name: "Movies",
    href: "/dashboard/movies",
    icon: "/icons/icon-nav-movies.svg",
  },
  {
    name: "Tv-Series",
    href: "/dashboard/tv-series",
    icon: "/icons/icon-nav-tv-series.svg",
  },
  {
    name: "Bookmarked",
    href: "/dashboard/bookmarked",
    icon: "/icons/icon-nav-bookmark.svg",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6 md:gap-8 lg:flex-col lg:gap-10">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex items-center justify-center", {
              "": pathname === link.href,
            })}
          >
            <div className="relative h-4 w-4 lg:h-5 lg:w-5">
              <Image
                src={link.icon}
                alt={`${link.name} icon`}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
