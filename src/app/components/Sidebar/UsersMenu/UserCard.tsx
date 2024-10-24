"use client";

import { createChat } from "@/app/actions/createChat";
import { UserMetadata } from "@/types/types";
import { UserProfile } from "@prisma/client";
import Image from "next/image";
import React, { useCallback } from "react";

type Props = {
  otherUser: UserProfile;
};

export function UserCard({ otherUser }: Props) {
  const handleClick = useCallback(async () => {
    await createChat(otherUser);
  }, [otherUser.id]);

  return (
    <div onClick={handleClick} className="flex cursor-pointer rounded-lg hover:bg-hover p-2 gap-4 items-center">
      <Image className="rounded-full" src={(otherUser.user_metadata as UserMetadata).avatar_url} width={32} height={32} alt="avatar" />
      <h1>{otherUser.username}</h1>
    </div>
  );
}
