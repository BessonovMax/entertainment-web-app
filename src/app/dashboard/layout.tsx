import SideNav from "@/ui/dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div>
        <div className="flex lg:sticky lg:h-dvh lg:flex-col">
          <div className="grow lg:my-8 lg:ml-8">
            <SideNav />
          </div>
        </div>
      </div>
      <div className="mx-4 my-6 md:mx-[1.5625rem] md:my-8 lg:mx-[2.25rem] lg:my-16 lg:min-w-0">
        {children}
      </div>
    </div>
  );
}
