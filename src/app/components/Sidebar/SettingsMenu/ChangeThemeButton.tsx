"use client";

import { useTheme } from "next-themes";
import React, { useCallback } from "react";

export function ChangeThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <button
      onClick={handleClick}
      className="whitespace-nowrap rounded-lg px-4 py-2 hover:bg-hover dark:hover:bg-dark-hover"
    >
      Change Theme
    </button>
  );
}
