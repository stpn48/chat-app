import { Chat, UserProfile } from "@prisma/client";
import { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import React from "react";

type Props = {
  chat: Chat & { users: UserProfile[] };
};

export function ChattingWith({ chat }: Props) {
  return (
    <div className="absolute left-[50%] z-50 mt-4 flex w-fit -translate-x-[50%] items-center gap-4 rounded-full border px-4 py-2 shadow-sm">
      <Image
        className="rounded-full"
        src={(chat.users[1].user_metadata as UserMetadata).avatar_url}
        width={32}
        height={32}
        alt="avatar"
      />
      <h1>{chat.users[1].username}</h1>
    </div>
  );
}
