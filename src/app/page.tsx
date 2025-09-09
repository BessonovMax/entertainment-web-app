import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const loggedIn = true;

  if (loggedIn) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Welcome to the Entertainment App!</h1>
      <p>Please login or sign up to continue.</p>
      <p>
        <Link href="/login">Login</Link> | <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
