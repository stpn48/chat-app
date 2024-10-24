import { OptimisticMessagesProvider } from "@/context/useOptimisticMessages";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";

type Props = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: Props) {
  if (!params.id) {
    redirect("/app");
  }

  const user = await getUser();

  const chat = await prisma.chat.findUnique({
    where: {
      id: params.id,
    },
    include: {
      messages: true,
      users: true,
    },
  });

  if (!chat || !chat.users.some((chatUser) => chatUser.id === user!.id)) {
    redirect("/app");
  }

  return (
    <OptimisticMessagesProvider initialMessages={chat.messages} userId={user!.id}>
      <div className="mx-auto flex h-screen w-[70%] flex-col justify-between gap-4 px-4 pb-4">
        <MessageList userId={user!.id} />
        <SendMessageForm chatId={chat.id} />
      </div>
    </OptimisticMessagesProvider>
  );
}
