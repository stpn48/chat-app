"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, onChange, ...props }: Props) {
  const [userTyped, setUserTyped] = useState(false);

  return (
    <div className="relative">
      {userTyped && (
        <p className="absolute -top-[10px] left-1 bg-inherit bg-white px-1 text-xs text-secondary dark:bg-dark-main dark:text-dark-secondary">
          {props.placeholder}
        </p>
      )}
      <input
        onChange={(e) => {
          setUserTyped(!!e.target.value);
          onChange?.(e);
        }}
        className={twMerge(
          "rounded-lg border border-main px-4 py-2 outline-0 focus:ring dark:border-dark-main dark:focus:border-white dark:focus:ring dark:focus:ring-stone-600",
          className,
        )}
        {...props}
      />
    </div>
  );
}
