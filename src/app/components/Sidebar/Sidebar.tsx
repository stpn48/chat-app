import { UserCredentials } from "@/components/UserCredentials";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";
import { ChatList } from "./ChatList";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import { StartNewChatButton } from "./StartNewChatButton";

export async function Sidebar() {
  const user = await getUser();

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      id: user!.id,
    },
  });

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

  return (
    <div className="h-screen p-2">
      <div className="relative flex h-full w-[325px] flex-col justify-between rounded-lg border bg-white p-4 shadow-spread dark:border-dark-main dark:bg-dark-main">
        <div>
          <div className="flex justify-between py-2">
            <h1 className="text-base font-medium">Your chats</h1>
            <StartNewChatButton users={users} />
          </div>
          <ChatList chats={chats} />
        </div>
        <div className="flex w-full items-center justify-between">
          <SettingsMenu />
          <UserCredentials user={userProfile!} hideName />
        </div>
      </div>
    </div>
  );
}
