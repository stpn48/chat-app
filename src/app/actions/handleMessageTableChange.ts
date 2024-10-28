"use server";

import { revalidatePath } from "next/cache";

export async function handleMessageTableChange(chatId: string) {
  revalidatePath(`/app/chat/${chatId}`);
}
