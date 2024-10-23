import React from "react";
import { StartNewChatButton } from "./StartNewChatButton";
import { UsersMenu } from "./UsersMenu";

type Props = {};

export async function Sidebar({}: Props) {
  const usersMenu = await UsersMenu();

  return (
    <div className="p-2 h-screen">
      <div className="w-[325px] p-4 border border-main rounded-lg bg-main shadow-md h-full">
        <StartNewChatButton UsersMenu={usersMenu} />
      </div>
    </div>
  );
}
