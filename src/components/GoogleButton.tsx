"use client";

import { signInWithProvider } from "@/app/actions/supabaseAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

export function GoogleButton() {
  const router = useRouter();

  const handleClick = useCallback(async () => {
    const { error, url } = await signInWithProvider("google");

    if (error) {
      toast.error(error);
      return;
    }

    if (url) {
      router.push(url);
    }
  }, [router]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex w-full items-center justify-center rounded-lg border border-main px-4 py-3 hover:border-hover dark:border-dark-main dark:hover:border-dark-hover"
    >
      <Image src={"/googleLogo.png"} alt="googleLogo" height={24} width={24} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}
