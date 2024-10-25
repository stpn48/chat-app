"use client";

import { updateMsgStatus } from "@/app/actions/updateMsgStatus";
import { useOptimisticMessages } from "@/context/useOptimisticMessages";
import { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useScrolledToBottom } from "../hooks/useScrolledToBottom";
import { Message } from "./Message";

type Props = {
  userId: string;
};

export function MessageList({ userId }: Props) {
  const { messages } = useOptimisticMessages();

  const containerRef = useRef<HTMLDivElement>(null);

  const { isScrolledToBottom } = useScrolledToBottom(messages, containerRef);

  const handleUpdateMsgStatus = useCallback(async (msgId: string) => {
    await updateMsgStatus(msgId, "seen");
  }, []);

  useEffect(() => {
    if (isScrolledToBottom) {
      messages.forEach((msg) => {
        if (msg.status === "delivered" && msg.userId !== userId) {
          handleUpdateMsgStatus(msg.id);
        }
      });
    }
  }, [isScrolledToBottom, messages, handleUpdateMsgStatus, userId]);

  return (
    <div
      ref={containerRef}
      className={twMerge("flex flex-col gap-4 overflow-y-scroll scroll-smooth px-6 pt-10", !isScrolledToBottom && "opacity-0")}
    >
      {messages.map((msg, index) => (
        <Message key={msg.id} isLastMessage={index === messages.length - 1} isAuthor={userId === msg.userId} msg={msg} />
      ))}
    </div>
  );
}
