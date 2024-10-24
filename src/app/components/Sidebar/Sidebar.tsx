import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
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
    <div className="p-2 h-screen">
      <div className="w-[325px] relative p-4 border border-main rounded-lg bg-main shadow-md h-full">
        <div className="flex py-2 justify-between">
          <h1>Your chats</h1>
          <StartNewChatButton users={users} />
        </div>
        <ChatList chats={chats} />
        <SignOutButton /> {/* TODO: Remove this later */}
      </div>
    </div>
  );
}
