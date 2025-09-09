import SideNav from "@/ui/dashboard/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div>
        <SideNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
