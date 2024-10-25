"use server";

import prisma from "@/utils/prisma";

export async function updateMsgStatus(msgId: string, status: string) {
  await prisma.message.update({
    where: {
      id: msgId,
    },
    data: {
      status,
    },
  });
}
