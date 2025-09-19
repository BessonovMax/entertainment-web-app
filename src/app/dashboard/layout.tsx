import SideNav from "@/ui/dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:justify-center lg:py-8 lg:pl-8">
        <SideNav />
      </div>

      <div className="mx-4 my-6 md:mx-[1.5625rem] md:my-8 lg:mx-[2.25rem] lg:my-16 lg:min-w-0 lg:flex-1">
        {children}
      </div>
    </div>
  );
}
