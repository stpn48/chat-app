import { getUser } from "@/utils/supabase/server";
import { Chat, Message, UserProfile } from "@prisma/client";
import React from "react";
import { ChatCard } from "./ChatCard";

type Props = {
  chats: ((Chat & { users: UserProfile[] }) & { messages: Message[] })[];
};

export async function ChatList({ chats }: Props) {
  const loggedInUser = await getUser();

  return (
    <div className="flex flex-col gap-2">
      <div className="h-px w-full rounded-full bg-hover dark:bg-[#272727]" />
      <div className="mt-2 flex flex-col gap-1">
        {chats.map((chat) => {
          const chattingWith = chat.users.filter((user) => user.id !== loggedInUser?.id);

          return <ChatCard key={chat.id} chat={chat} chattingWith={chattingWith} />;
        })}
      </div>
    </div>
  );
}
