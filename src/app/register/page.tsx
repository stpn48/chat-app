"use client";

import { Button } from "@/components/Button";
import { GoogleButton } from "@/components/GoogleButton";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { registerWithEmailAndPassword } from "../actions/supabaseAuth";

export default function RegisterPage() {
  const [isRegistering, startRegistering] = useTransition();

  const router = useRouter();

  const handleRegister = useCallback(
    async (formData: FormData) => {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      const confirmPassword = formData.get("confirmPassword")?.toString() || "";

      if (!email || !password || !confirmPassword) {
        toast.error("Please fill all fields");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        toast.error("Invalid email");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      startRegistering(async () => {
        const { error } = await registerWithEmailAndPassword(email, password);

        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Registration successful");
        router.replace("/app");
      });
    },
    [router],
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center text-base font-medium">
      <form action={handleRegister} className="flex flex-col items-center gap-6">
        <h1 className="mb-4 flex w-full justify-center text-2xl font-bold">Register to chat-app</h1>
        <Input type="email" disabled={isRegistering} name="email" placeholder="Email" />
        <Input disabled={isRegistering} type="password" name="password" placeholder="Password" />
        <Input
          disabled={isRegistering}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <p>
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
        <Button disabled={isRegistering} className="w-full">
          Register
        </Button>
        <div className="flex h-px w-full items-center justify-center bg-black">
          <p className="bg-white px-2">or</p>
        </div>
        <GoogleButton />
      </form>

      <p className="absolute bottom-4 left-4 text-xs text-secondary">
        2024® random-chat-app All Rights Reserved
      </p>
    </div>
  );
}
