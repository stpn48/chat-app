import { UserCredentials } from "@/components/UserCredentials";
import { getUser } from "@/utils/supabase/server";
import { Chat, UserProfile } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  chat: Chat & { users: UserProfile[] };
};

export async function ChatCard({ chat }: Props) {
  const loggedInUser = await getUser();

  const chattingWith = chat.users.filter((user) => user.id !== loggedInUser?.id);

  return (
    <Link href={`/app/chat/${chat.id}`}>
      <div
        key={chat.id}
        className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-hover dark:hover:bg-dark-hover"
      >
        <UserCredentials user={chattingWith[0]} />
      </div>
    </Link>
  );
}
