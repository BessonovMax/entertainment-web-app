import SideNav from "@/ui/dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div>
        <div className="flex h-full lg:flex-col">
          <div className="grow lg:my-8 lg:ml-8">
            <SideNav />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
