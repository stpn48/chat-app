import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  size?: "sm" | "md" | "lg";
};

export function LoadingSpinner({ size }: Props) {
  return (
    <div
      className={twMerge(
        "h-4 w-4 animate-spin rounded-full border-t border-white",
        size === "sm" && "h-3 w-3",
        size === "md" && "h-5 w-5",
        size === "lg" && "h-6 w-6",
      )}
    />
  );
}
