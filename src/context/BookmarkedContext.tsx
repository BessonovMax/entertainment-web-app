"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type BookmarkedContextType = {
  bookmarkedTitles: Set<string>;
  toggleBookmark: (title: string) => void;
};

const BookmarkedContext = createContext<BookmarkedContextType | undefined>(
  undefined,
);

type ProviderProps = {
  children: ReactNode;
  initialBookmarkedTitles: string[]; // <-- Новый prop!
};

export function BookmarkedProvider({
  children,
  initialBookmarkedTitles,
}: ProviderProps) {
  const [bookmarkedTitles, setBookmarkedTitles] = useState(
    new Set(initialBookmarkedTitles),
  );

  const toggleBookmark = (title: string) => {
    setBookmarkedTitles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <BookmarkedContext.Provider value={{ bookmarkedTitles, toggleBookmark }}>
      {children}
    </BookmarkedContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkedContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkedProvider");
  }
  return context;
}
