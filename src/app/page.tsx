/* app/page */
import Link from "next/link";
import AuthCardWrapper from "@/ui/auth/auth-card-wrapper";

export default async function Page() {
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
                Entertainment Web App
              </Link>{" "}
              enhanced with a{" "}
              <Link
                className="text-nowrap"
                target="_blank"
                href={"https://developer.themoviedb.org/"}
              >
                TMDB API
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
