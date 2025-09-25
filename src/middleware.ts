// src/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Create a response object that we can modify and return at the end.
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create a Supabase client using the non-deprecated cookie handling methods.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // --- THE CORRECT, NON-DEPRECATED PATTERN ---
        getAll() {
          // This function is expected to return all cookies from the request.
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options: CookieOptions;
          }>,
        ) {
          // This function is expected to set all cookies on the response.
          // It may be called multiple times, so we loop through the array.
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value); // Update request cookies for server components
            response.cookies.set(name, value, options); // Update response cookies for the browser
          });
        },
      },
    },
  );

  // This call will now use the getAll/setAll methods to securely refresh the session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- Route Protection Logic (remains the same) ---
  const { pathname } = request.nextUrl;

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Return the response, which may have been updated with a new session cookie.
  return response;
}

// The matcher configuration remains the same and is correct.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
