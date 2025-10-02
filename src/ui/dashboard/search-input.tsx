// src/ui/dashboard/search-input.tsx
"use client";

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
      <svg
        className="size-6 self-start md:size-8"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
          fill="#fff"
        />{" "}
      </svg>
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
