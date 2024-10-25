import { useEffect, useState } from "react";

export function useScrolledToBottom(
  messages: {
    chatId: string;
    id: string;
    createdAt: Date;
    userId: string;
    text: string;
  }[],
  containerRef: React.RefObject<HTMLDivElement>,
) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "instant",
      });
      setIsScrolledToBottom(true);
    }
  }, [messages, setIsScrolledToBottom, containerRef]);

  return { isScrolledToBottom };
}
