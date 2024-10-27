"use client";

import { useSidebar } from "@/store/useSidebar";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
};

export function SidebarContainer({ children }: Props) {
  const { showSidebar } = useSidebar();

  return (
    <div
      className={twMerge(
        "m-2 flex h-[98%] w-[325px] flex-col justify-between rounded-lg border bg-white p-4 shadow-spread transition-all duration-300 dark:border-dark-main dark:bg-dark-main sm:absolute",
        !showSidebar ? "sm:-left-[325px] sm:opacity-0" : "sm:left-0",
      )}
    >
      {children}
    </div>
  );
}
