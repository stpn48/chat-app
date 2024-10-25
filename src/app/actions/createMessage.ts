"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createMessage(chatId: string, message: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    await prisma.message.create({
      data: {
        chatId,
        userId: user.id,
        text: message,
      },
    });

    revalidatePath(`/app/chat/${chatId}`);
  } catch () {
    throw new Error("Error creating message");
  }
}
