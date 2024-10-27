"use server";

import { getUser } from "@/utils/supabase/server";
import { Message } from "@prisma/client";

export async function getNewMsgCount(messages: Message[]) {
  const loggedInUser = await getUser();

  let newMessageCount = 0;

  messages.forEach((message) => {
    if (message.userId !== loggedInUser?.id && message.status === "delivered") {
      newMessageCount++;
    }
  });

  return newMessageCount;
}
