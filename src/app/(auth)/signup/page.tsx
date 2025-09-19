import AuthCardWrapper from "@/ui/auth-card-wrapper";
import Link from "next/link";

export default function Page() {
  return (
    <AuthCardWrapper>
      <form className="flex flex-col gap-10" action="">
        <h2 className="text-[2rem] leading-[125%] font-light tracking-[-0.5px]">
          Sign Up
        </h2>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <input
            type="text"
            className="caret-foreground border-nav-item border-b px-4 pb-4 outline-none focus:border-white"
            placeholder="Email address"
          />
          <input
            className="caret-foreground border-nav-item border-b px-4 pb-4 outline-none focus:border-white"
            type="text"
            placeholder="Password"
          />
          <input
            className="caret-foreground border-nav-item border-b px-4 pb-4 outline-none focus:border-white"
            type="text"
            placeholder="Repeat Password"
          />
        </div>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <input
            type="submit"
            value={"Create an account"}
            className="bg-foreground hover:text-background cursor-pointer rounded-[6px] py-[0.78125rem] hover:bg-white"
          />
          <div className="flex justify-center gap-2">
            <p>Already have an account?</p>
            <Link className="text-foreground" href={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </form>
    </AuthCardWrapper>
  );
}
