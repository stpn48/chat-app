import { UserCredentials } from "@/components/UserCredentials";
import { getUser } from "@/utils/supabase/server";
import { Chat, UserProfile } from "@prisma/client";
import React from "react";

type Props = {
  chat: Chat & { users: UserProfile[] };
};

export async function ChattingWith({ chat }: Props) {
  const loggedInUser = await getUser();

  const chattingWith = chat.users.filter((user) => user.id !== loggedInUser?.id);

  return (
    <div className="absolute left-[50%] z-50 mt-4 flex w-fit -translate-x-[50%] items-center gap-2 rounded-full border p-2 px-3 shadow-sm dark:border-dark-main">
      <UserCredentials user={chattingWith[0]} />
    </div>
  );
}
