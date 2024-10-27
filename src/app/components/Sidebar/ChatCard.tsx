"use client";

import { UserCredentials } from "@/components/UserCredentials";
import { Chat, Message, UserProfile } from "@prisma/client";
import Link from "next/link";
import React, { useCallback } from "react";
import { useNewMsgCount } from "./hooks/useNewMsgCount";
import { NewMessagesCount } from "./NewMessagesCount";

type Props = {
  chat: (Chat & { users: UserProfile[] }) & { messages: Message[] };
  chattingWith: UserProfile[];
};

export function ChatCard({ chat, chattingWith }: Props) {
  const { newMessagesCount, setNewMessagesCount } = useNewMsgCount(chat.messages);

  const resetNewMessagesCount = useCallback(() => {
    setNewMessagesCount(0);
  }, [setNewMessagesCount]);

  return (
    <Link onClick={resetNewMessagesCount} href={`/app/chat/${chat.id}`}>
      <div
        key={chat.id}
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-hover dark:hover:bg-dark-hover"
      >
        <UserCredentials user={chattingWith[0]} />
        {newMessagesCount > 0 && <NewMessagesCount newMessagesCount={newMessagesCount} />}
      </div>
    </Link>
  );
}
