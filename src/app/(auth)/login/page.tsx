import AuthCardWrapper from "@/ui/auth-card-wrapper";
import Link from "next/link";

export default function Page() {
  return (
    <AuthCardWrapper>
      <form className="flex flex-col gap-10" action="">
        <h1 className="text-[2rem] leading-[125%] font-light tracking-[-0.5px]">
          Login
        </h1>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <input
            type="text"
            id="email"
            name="email"
            className="caret-foreground border-nav-item border-b px-4 pb-4 outline-none focus:border-white"
            placeholder="Email address"
            required
          />
          <input
            className="caret-foreground border-nav-item border-b px-4 pb-4 outline-none focus:border-white"
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <input
            type="submit"
            value={"Login to your account"}
            className="bg-foreground hover:text-background cursor-pointer rounded-[6px] py-[0.78125rem] hover:bg-white"
          />
          <div className="flex justify-center gap-2">
            <p>Don&rsquo;t have an account?</p>
            <Link className="text-foreground" href={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </AuthCardWrapper>
  );
}
