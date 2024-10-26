import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  disabled: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, disabled, ...props }: Props) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black",
        className,
        disabled && "cursor-not-allowed opacity-50",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
