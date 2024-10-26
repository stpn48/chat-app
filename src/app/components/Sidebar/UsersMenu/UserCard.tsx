"use client";

import { createChat } from "@/app/actions/createChat";
import { UserCredentials } from "@/components/UserCredentials";
import { UserProfile } from "@prisma/client";
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
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-hover dark:hover:bg-dark-hover"
    >
      <UserCredentials user={otherUser} />
    </div>
  );
}
