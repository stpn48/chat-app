import { Chat, UserProfile } from "@prisma/client";
import React from "react";
import { ChatCard } from "./ChatCard";

type Props = {
  chats: (Chat & { users: UserProfile[] })[];
};

export function ChatList({ chats }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-px w-full rounded-full bg-hover dark:bg-[#272727]" />
      <div className="mt-2 flex flex-col gap-1">
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
