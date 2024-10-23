"use client";

import { signInWithProvider } from "@/app/actions/signInWithProvider";
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
    <button onClick={handleClick} className="flex justify-center p-4 border rounded-lg bg-main border-main hover:bg-[#fafafa]">
      <Image src={"/googleLogo.png"} width={32} height={32} alt="google-logo" />
    </button>
  );
}
