import React from "react";
import { StartNewChatButton } from "./StartNewChatButton";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <div className="p-2 h-screen">
      <div className="w-[325px] p-4 border border-main rounded-lg bg-main shadow-md h-full">
        <StartNewChatButton />
      </div>
    </div>
  );
}
