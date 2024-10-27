"use client";

import { useSidebar } from "@/store/useSidebar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {};

export function HideSidebarHoverContainer({}: Props) {
  const { setShowSidebar, showSidebar } = useSidebar();

  const [isHovering, setIsHovering] = useState(false);

  const handleArrowButtonClick = useCallback(() => {
    setIsHovering(false);
    setShowSidebar((prev) => !prev);
  }, [setShowSidebar, setIsHovering]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={twMerge(
        "absolute z-50 flex h-[97%] w-[70px] items-center justify-center",
        showSidebar ? "left-[325px]" : "-left-0",
      )}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.button
            onClick={handleArrowButtonClick}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 dark:bg-dark-main"
          >
            {showSidebar ? <ArrLeft /> : <ArrRight />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-white"
    >
      <path
        fillRule="evenodd"
        d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-white"
    >
      <path
        fillRule="evenodd"
        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
