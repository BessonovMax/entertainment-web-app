import NavLinks from "@/ui/dashboard/nav-links";
import Image from "next/image";

export default function SideNav() {
  const defaultAvatar = "/image-avatar.png";
  return (
    <div className="bg-card-background flex grow items-center justify-between p-4 md:p-5 lg:h-full lg:flex-col lg:justify-normal lg:rounded-[20px] lg:px-7 lg:py-[33.7px]">
      <div className="relative h-5 w-[25px] md:h-[25.6px] md:w-8 lg:mb-[4.5rem]">
        <Image
          src="/logo.svg"
          alt="logo icon"
          fill
          className="object-contain"
        />
      </div>
      <div className="lg:mb-[4.5rem]">
        <NavLinks />
      </div>
      <div className="relative size-6 md:size-8 lg:mt-auto lg:size-10">
        <Image
          src={defaultAvatar}
          alt="user icon"
          fill
          className="rounded-full border-1 border-white object-contain"
        />
      </div>
    </div>
  );
}
