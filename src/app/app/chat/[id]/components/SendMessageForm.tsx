"use client";

import { createMessage } from "@/app/actions/createMessage";
import { useOptimisticMessages } from "@/context/useOptimisticMessages";
import React, { useCallback, useRef } from "react";

type Props = {
  chatId: string;
};

export function SendMessageForm({ chatId }: Props) {
  const { addMessage } = useOptimisticMessages();

  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = useCallback(
    async (formData: FormData) => {
      const message = formData.get("message-text")?.toString();

      if (!message || !messageInputRef.current) return;

      messageInputRef.current.value = "";
      addMessage(message);

      try {
        await createMessage(chatId, message);
      } catch (error) {
        console.error(error); //TODO: Add toast
      }
    },
    [chatId, messageInputRef, addMessage],
  );

  return (
    <form className="bottom-10 flex items-center justify-center gap-4" action={handleSendMessage}>
      <input
        ref={messageInputRef}
        className="flex-grow rounded-full border border-main px-4 py-2 outline-none dark:border-dark-main"
        name="message-text"
        type="text"
        placeholder="enter message"
      />
      <button className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-blue-600 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 text-white"
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
