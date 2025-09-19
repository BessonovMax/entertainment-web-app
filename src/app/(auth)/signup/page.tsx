"use client";
import AuthCardWrapper from "@/ui/auth-card-wrapper";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    // Create a temporary errors object
    const newErrors = { email: "", password: "", repeatPassword: "" };
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

    // Validate password
    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = "Can't be empty";
      hasError = true;
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    // If there are no errors, proceed with submission
    if (!hasError) {
      console.log("Form is valid! Submitting...", { email, password });
      // Here you would typically call your authentication API
    }
  };

  return (
    <AuthCardWrapper>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
        <h2 className="text-[2rem] leading-[125%] font-light tracking-[-0.5px]">
          Sign Up
        </h2>
        <div className="flex flex-col gap-6 text-[0.9375rem] font-light">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              className={clsx(
                "caret-foreground w-full border-b px-4 pb-4 outline-none",
                {
                  "border-nav-item focus:border-white": !errors.email,
                  "border-foreground": errors.email,
                },
              )}
              placeholder="Email address"
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
          <div className="relative">
            <label htmlFor="repeat-password" className="sr-only">
              Repeat password
            </label>
            <input
              className={clsx(
                "caret-foreground w-full border-b px-4 pb-4 outline-none",
                {
                  "border-nav-item focus:border-white": !errors.repeatPassword,
                  "border-foreground": errors.repeatPassword,
                },
              )}
              type="password"
              id="repeat-password"
              name="repeat-password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, repeatPassword: "" });
                }
              }}
            />
            {errors.repeatPassword && (
              <p className="text-foreground absolute top-0 right-4">
                {errors.repeatPassword}
              </p>
            )}
          </div>
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
