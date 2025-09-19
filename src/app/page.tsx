import Link from "next/link";
import { redirect } from "next/navigation";

import AuthCardWrapper from "@/ui/auth-card-wrapper";

export default function Page() {
  const loggedIn = false;

  if (loggedIn) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-6 py-12 md:py-[12rem]">
      <AuthCardWrapper>
        <h1 className="text-center text-2xl md:text-4xl">
          Welcome to the
          <span className="text-foreground text-nowrap">
            {" "}
            Entertainment App
          </span>
          !
        </h1>
        <p className="text-center text-lg font-light md:text-2xl">
          Please login or sign up to continue.
        </p>
        <p className="flex items-center justify-center gap-6 text-lg">
          <Link className="bg-foreground rounded-xl px-4 py-1" href="/login">
            Login
          </Link>
          |{" "}
          <Link className="bg-foreground rounded-xl px-4 py-1" href="/signup">
            Sign Up
          </Link>
        </p>
      </AuthCardWrapper>
    </div>
  );
}
