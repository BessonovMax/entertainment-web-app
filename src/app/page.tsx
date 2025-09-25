import Link from "next/link";
import { redirect } from "next/navigation";

import AuthCardWrapper from "@/ui/auth/auth-card-wrapper";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // Если пользователя нет, перенаправляем
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-6 py-12 md:py-[12rem]">
      <AuthCardWrapper>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-2xl md:text-4xl">
              Welcome to the
              <Link
                href={
                  "https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X"
                }
                target="_blank"
                className="text-foreground text-nowrap"
              >
                {" "}
                Entertainment App
              </Link>
              !
            </h1>
            <p className="text-center text-lg font-light md:text-2xl">
              Please login or sign up to continue.
            </p>
          </div>
          <p className="flex items-center justify-center gap-6 text-lg">
            <Link className="bg-foreground rounded-xl px-4 py-1" href="/login">
              Login
            </Link>
            |{" "}
            <Link className="bg-foreground rounded-xl px-4 py-1" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </AuthCardWrapper>
    </div>
  );
}
