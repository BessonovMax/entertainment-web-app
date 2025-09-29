/* app/(auth)/layout */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center gap-14 px-6 py-12 md:gap-20 md:py-[4.9rem]">
      {children}
    </div>
  );
}
