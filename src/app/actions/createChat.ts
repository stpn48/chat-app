"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { UserProfile } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createChat(withUser: UserProfile) {
  const user = await getUser();

  const userProfile = await prisma.userProfile.findUnique({
    where: {
      id: user!.id,
    },
  });

  if (!user || !userProfile) {
    return { error: "Not Authenticated", chat: null };
  }

  // Check if a chat already exists between the two users
  const existingChat = await prisma.chat.findFirst({
    where: {
      users: {
        some: {
          id: { in: [userProfile.id, withUser.id] },
        },
      },
    },
    include: {
      users: true, // Include users in the returned chat object
    },
  });

  if (existingChat) {
    console.log("Existing chat found:", existingChat);
    return { chat: existingChat }; // Return the existing chat
  }

  // If no existing chat, create a new one
  const newChat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: userProfile.id }, { id: withUser.id }],
      },
    },
    include: {
      users: true,
    },
  });

  console.log("New chat created:", newChat);
  revalidatePath("/app");

  return { chat: newChat }; // Return the newly created chat
}
