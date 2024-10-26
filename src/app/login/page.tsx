"use client";

import { Button } from "@/components/Button";
import { GoogleButton } from "@/components/GoogleButton";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { logInWithEmailAndPassword } from "../actions/supabaseAuth";

export default function LoginPage() {
  const [isLoggingIn, startLoggingIn] = useTransition();

  const router = useRouter();

  const handleLogin = useCallback(
    async (formData: FormData) => {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";

      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        toast.error("Invalid email");
        return;
      }

      startLoggingIn(async () => {
        const { error } = await logInWithEmailAndPassword(email, password);

        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Login successful");
        router.replace("/app");
      });
    },
    [router],
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center text-base font-medium">
      <form action={handleLogin} className="flex flex-col items-center gap-6">
        <h1 className="mb-4 flex w-full justify-center text-2xl font-bold">Login to chat-app</h1>
        <Input type="email" disabled={isLoggingIn} name="email" placeholder="Email" />
        <Input type="password" disabled={isLoggingIn} name="password" placeholder="Password" />
        <p>
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/register">
            Register
          </Link>
        </p>
        <Button className="w-full" disabled={isLoggingIn}>
          Login
        </Button>
        <div className="flex h-px w-full items-center justify-center bg-black dark:bg-[#323232]">
          <p className="bg-white px-2 dark:bg-dark-main">or</p>
        </div>
        <GoogleButton />
      </form>

      <p className="absolute bottom-4 left-4 text-xs text-secondary">
        2024® random-chat-app All Rights Reserved
      </p>
    </div>
  );
}
