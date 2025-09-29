/* app/(auth)/login/page */
"use client";
import { createClient } from "@/lib/supabase/client";
import AuthCardWrapper from "@/ui/auth/auth-card-wrapper";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    setIsLoading(true); // Включаем индикатор загрузки
    setErrors({ ...errors, api: "" }); // Очищаем предыдущие ошибки API

    // Create a temporary errors object
    const newErrors = { email: "", password: "" };
    let hasError = false;

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Can't be empty";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Basic email format check
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Can't be empty";
      hasError = true;
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    // If there are no errors, proceed with submission
    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: apiError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (apiError) {
        setErrors((prevErrors) => ({ ...prevErrors, api: apiError.message }));
      } else if (data.user) {
        console.log("Logged in successfully!", data.user);
        router.push("/dashboard"); // Перенаправляем на дашборд
        router.refresh(); // Обязательно делаем refresh, чтобы обновить сессию на сервере
      } else {
        // Это может произойти, если нет ошибки, но и нет пользователя (редко)
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "An unexpected error occurred.",
        }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        api: "Network or unexpected error.",
      }));
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardWrapper>
      <form className="flex flex-col gap-10" noValidate onSubmit={handleSubmit}>
        <h1 className="text-[2rem] leading-[125%] font-light tracking-[-0.5px]">
          Login
        </h1>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              placeholder="Email address"
              className={clsx(
                "caret-foreground w-full border-b px-4 pb-4 outline-none",
                {
                  "border-nav-item focus:border-white": !errors.email,
                  "border-foreground": errors.email,
                },
              )}
            />
            {errors.email && (
              <p className="text-foreground absolute top-0 right-4">
                {errors.email}
              </p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className={clsx(
                "caret-foreground w-full border-b px-4 pb-4 outline-none",
                {
                  "border-nav-item focus:border-white": !errors.password,
                  "border-foreground": errors.password,
                },
              )}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            {errors.password && (
              <p className="text-foreground absolute top-0 right-4">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        {errors.api && (
          <p className="text-foreground text-center">{errors.api}</p>
        )}

        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <input
            type="submit"
            value={isLoading ? "Logging in..." : "Login to your account"}
            disabled={isLoading}
            className="bg-foreground hover:text-background cursor-pointer rounded-[6px] py-[0.78125rem] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
