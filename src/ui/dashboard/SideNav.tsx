import NavLinks from "@/ui/dashboard/nav-links";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="bg-card-background flex items-center justify-between p-5 lg:h-full lg:flex-col">
      <div className="relative h-5 w-[25px] md:h-[25.6px] md:w-8">
        <Image
          src="/logo.svg"
          alt="logo icon"
          fill
          className="object-contain"
        />
      </div>
      <NavLinks />
      <div className="relative size-6 md:size-8 lg:size-10">
        <Image
          src="/image-avatar.png"
          alt="avatar icon"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
