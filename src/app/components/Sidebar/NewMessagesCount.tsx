import React from "react";

type Props = {
  newMessagesCount: number;
};

export function NewMessagesCount({ newMessagesCount }: Props) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-semibold text-dark-main dark:text-white">
        {newMessagesCount} {newMessagesCount === 1 ? "New message" : "New messages"}
      </p>
      <div className="h-2 w-2 rounded-full bg-blue-600" />
    </div>
  );
}
