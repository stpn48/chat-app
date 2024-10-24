import { Chat, UserProfile } from "@prisma/client";
import { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  chat: Chat & { users: UserProfile[] };
};

export function ChatCard({ chat }: Props) {
  return (
    <Link href={`/app/chat/${chat.id}`}>
      <div key={chat.id} className="flex hover:bg-hover p-2 rounded-lg cursor-pointer  gap-4 items-center">
        <Image className="rounded-full" src={(chat.users[0].user_metadata as UserMetadata).avatar_url} width={32} height={32} alt="avatar" />
        <h1>{chat.users[0].username}</h1>
      </div>
    </Link>
  );
}
