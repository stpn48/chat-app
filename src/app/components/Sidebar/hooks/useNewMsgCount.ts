"use client";

import { getNewMsgCount } from "@/app/actions/getNewMsgCount";
import { Message } from "@prisma/client";
import { useEffect, useState } from "react";

export function useNewMsgCount(messages: Message[]) {
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const newMessagesCount = await getNewMsgCount(messages);
      setNewMessagesCount(newMessagesCount);
    };

    getCount();
  }, [messages]);

  return { newMessagesCount, setNewMessagesCount };
}
