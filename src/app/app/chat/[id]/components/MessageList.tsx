"use client";

import { useOptimisticMessages } from "@/context/useOptimisticMessages";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  userId: string;
};

export function MessageList({ userId }: Props) {
  const { messages } = useOptimisticMessages();

  return (
    <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth pt-10">
      {messages.map((msg) => (
        <div key={msg.chatId} className={twMerge("flex w-full", userId === msg.userId && "justify-end")}>
          <p
            className={twMerge(
              "rounded-full px-3 py-2 text-white",
              userId === msg.userId ? "bg-blue-600" : "bg-stone-100 text-black",
            )}
          >
            {msg.text}
          </p>
        </div>
      ))}
    </div>
  );
}
