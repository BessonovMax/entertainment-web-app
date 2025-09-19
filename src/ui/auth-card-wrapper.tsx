import Image from "next/image";

export default function AuthCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-[327px] flex-col items-center gap-14 md:min-w-[400px] md:gap-20">
      <div className="relative h-[25.6px] w-8">
        <Image
          src="/logo.svg"
          alt="logo icon"
          fill
          className="object-contain"
        />
      </div>
      <div className="bg-card-background w-full rounded-[1.25rem] px-6 py-[1.8125rem] md:px-8 md:py-[2.0625rem]">
        {children}
      </div>
    </div>
  );
}
