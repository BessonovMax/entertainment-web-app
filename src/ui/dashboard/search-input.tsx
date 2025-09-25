// src/ui/dashboard/search-input.tsx
"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // useDebouncedCallback will wait 300ms after the user stops typing
  // before calling the function.
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    // Update the URL without reloading the page
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="flex items-center gap-4 rounded-md md:gap-6 lg:gap-8">
      {/* You can add a search icon here */}
      <div className="relative size-6 self-start md:size-8">
        <Image
          alt="search icon"
          className="object-contain"
          fill
          src="/icons/icon-search.svg"
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        name="search-input"
        className="placeholder-login-card caret-foreground w-full border-b border-transparent pb-2.5 font-light text-white focus:border-gray-500 focus:outline-none md:text-2xl"
        // Set the default value from the URL search param on initial load
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
