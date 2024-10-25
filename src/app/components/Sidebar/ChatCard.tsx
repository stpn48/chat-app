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
      <div key={chat.id} className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-hover">
        <Image
          className="rounded-full"
          src={(chat.users[1].user_metadata as UserMetadata).avatar_url}
          width={32}
          height={32}
          alt="avatar"
        />
        <h1>{chat.users[1].username}</h1>
      </div>
    </Link>
  );
}
