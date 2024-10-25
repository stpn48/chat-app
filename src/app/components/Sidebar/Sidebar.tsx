import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";
import { ChatList } from "./ChatList";
import { SignOutButton } from "./SignOutButton";
import { StartNewChatButton } from "./StartNewChatButton";

export async function Sidebar() {
  const user = await getUser();

  // Find all users except the current user
  const users = await prisma.userProfile.findMany({
    where: {
      id: {
        not: user!.id,
      },
    },
  });

  // Find all chats where the current user is a part of
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: user!.id,
        },
      },
    },
    include: {
      users: true,
    },
  });

  console.log(chats);

  return (
    <div className="h-screen p-2">
      <div className="relative flex h-full w-[325px] flex-col rounded-lg border border-main bg-main p-4 shadow-md">
        <div className="mb-5 flex items-center gap-3">
          <Image className="rounded-full" src={user?.user_metadata.avatar_url} width={32} height={32} alt="avatar" />
          <h1 className="">{user?.user_metadata.full_name}</h1>
        </div>
        <div className="flex justify-between py-2">
          <h1 className="text-base font-medium">Your chats</h1>
          <StartNewChatButton users={users} />
        </div>
        <ChatList chats={chats} />
        <SignOutButton /> {/* TODO: Remove this later */}
      </div>
    </div>
  );
}
