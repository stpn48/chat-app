"use client";

import { useSidebar } from "@/store/useSidebar";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
};

export function PageContainer({ children }: Props) {
  const { showSidebar } = useSidebar();

  return (
    <div
      className={twMerge(
        "hidden w-full transition-all duration-300 sm:block",
        showSidebar ? "pl-[325px]" : "pl-0",
      )}
    >
      {children}
    </div>
  );
}
