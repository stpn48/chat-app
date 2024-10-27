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
        "absolute m-2 flex h-[98%] w-[325px] flex-col justify-between rounded-lg border bg-white p-4 shadow-spread transition-all duration-300 dark:border-dark-main dark:bg-dark-main",
        !showSidebar ? "-left-[325px] opacity-0" : "left-0",
      )}
    >
      {children}
    </div>
  );
}
