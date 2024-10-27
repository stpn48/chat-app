import { UserCredentials } from "@/components/UserCredentials";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import React from "react";
import { ChatList } from "./ChatList";
import { HideSidebarHoverContainer } from "./HideSidebarHoverContainer";
import { SettingsMenu } from "./SettingsMenu/SettingsMenu";
import { SidebarContainer } from "./SidebarContainer";
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
      messages: true,
    },
  });

  return (
    <div className="flex h-screen">
      <SidebarContainer>
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
      </SidebarContainer>
      <HideSidebarHoverContainer />
    </div>
  );
}
