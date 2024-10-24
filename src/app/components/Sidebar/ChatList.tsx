import { Chat, UserProfile } from "@prisma/client";
import React from "react";
import { ChatCard } from "./ChatCard";

type Props = {
  chats: (Chat & { users: UserProfile[] })[];
};

export function ChatList({ chats }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-px bg-hover rounded-full" />
      <div className="flex flex-col gap-1 mt-2">
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
