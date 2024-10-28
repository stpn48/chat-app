"use client";

import { handleMessageTableChange } from "@/app/actions/handleMessageTableChange";
import { updateMsgStatus } from "@/app/actions/updateMsgStatus";
import { useOptimisticMessages } from "@/context/useOptimisticMessages";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useScrolledToBottom } from "../hooks/useScrolledToBottom";
import { Message } from "./Message";

type Props = {
  userId: string;
  chatId: string;
};

export function MessageList({ userId, chatId }: Props) {
  const { messages } = useOptimisticMessages();

  const containerRef = useRef<HTMLDivElement>(null);

  const { isScrolledToBottom } = useScrolledToBottom(messages, containerRef);

  const handleChangeMessageStatus = useCallback(() => {
    messages.forEach(async (msg) => {
      if (msg.status === "delivered" && msg.userId !== userId) {
        await updateMsgStatus(msg.id, "seen");
      }
    });
  }, [messages, userId]);

  useEffect(() => {
    handleChangeMessageStatus();
  }, [messages, chatId]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("realtime-messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "Message" }, () => {
        handleMessageTableChange(chatId);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "Message" }, () => {
        handleMessageTableChange(chatId);
      })
      .subscribe();

    // cleanup
    return () => {
      async function unsubscribeChannel() {
        await channel.unsubscribe();
      }
      unsubscribeChannel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "flex flex-col gap-4 overflow-y-scroll scroll-smooth px-6 pt-10",
        !isScrolledToBottom && "opacity-0",
      )} // If is not scrolled to bottom hide the list
    >
      {messages.length === 0 && (
        <p className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center text-secondary">
          No messages yet
        </p>
      )}
      {messages.map((msg, index) => (
        <Message
          key={msg.id}
          isLastMessage={index === messages.length - 1}
          isAuthor={userId === msg.userId}
          msg={msg}
        />
      ))}
    </div>
  );
}
