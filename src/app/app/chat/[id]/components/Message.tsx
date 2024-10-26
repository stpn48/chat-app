"use client";

import { Message as MessageType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  msg: MessageType;
  isAuthor: boolean;
  isLastMessage: boolean;
};

export function Message({ msg, isAuthor, isLastMessage }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div key={msg.chatId} className={twMerge("relative flex w-full", isAuthor && "justify-end")}>
      <div className="flex flex-col items-end gap-px">
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={twMerge(
            "cursor-default rounded-full px-3 py-2 text-[15px] text-white",
            isAuthor && "bg-blue-600",
            !isAuthor && "bg-stone-100 text-black dark:bg-dark-secondary dark:text-white",
          )}
        >
          {msg.text}
        </p>

        {isLastMessage && isAuthor && (
          <p className="pr-[6px] text-xs text-secondary">{msg.status}</p>
        )}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 z-10 rounded-full border border-[#353535] bg-black bg-opacity-90 px-4 py-2 text-white"
          >
            {msg.createdAt.toLocaleString()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
