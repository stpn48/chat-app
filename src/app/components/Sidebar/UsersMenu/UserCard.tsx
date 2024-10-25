"use client";

import { createChat } from "@/app/actions/createChat";
import { UserMetadata } from "@/types/types";
import { UserProfile } from "@prisma/client";
import Image from "next/image";
import React, { useCallback } from "react";

type Props = {
  otherUser: UserProfile;
  closeMenu: () => void;
};

export function UserCard({ otherUser, closeMenu }: Props) {
  const handleClick = useCallback(async () => {
    closeMenu();
    await createChat(otherUser);
  }, [closeMenu, otherUser]);

  return (
    <div onClick={handleClick} className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-hover">
      <Image
        className="rounded-full"
        src={(otherUser.user_metadata as UserMetadata).avatar_url}
        width={32}
        height={32}
        alt="avatar"
      />
      <h1>{otherUser.username}</h1>
    </div>
  );
}
