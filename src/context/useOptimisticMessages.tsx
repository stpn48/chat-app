"use client";

import { Message } from "@prisma/client";
import React, { createContext, useCallback, useContext, useMemo, useOptimistic } from "react";
import { v4 as uuidv4 } from "uuid";

type ContextType = {
  messages: Message[];
  addMessage: (messageText: string) => void;
};

const context = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
  initialMessages: Message[];
  userId: string;
};

export function OptimisticMessagesProvider({ children, initialMessages, userId }: Props) {
  const [messages, setMessages] = useOptimistic(initialMessages);

  const addMessage = useCallback(
    (messageText: string) => {
      setMessages((messages) => [
        ...messages,
        {
          chatId: uuidv4(),
          userId: userId,
          status: "",
          text: messageText,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ]);
    },
    [setMessages, userId],
  );

  const value = useMemo(() => {
    return {
      messages: messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
      addMessage,
    };
  }, [messages, addMessage]);

  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useOptimisticMessages() {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error("useOptimisticMessages must be used within a OptimisticMessagesProvider");
  }

  return contextValue;
}
