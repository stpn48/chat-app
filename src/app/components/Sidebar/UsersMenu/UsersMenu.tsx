"use client";

import { UserProfile } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import { UserCard } from "./UserCard";

type Props = {
  otherUsers: UserProfile[];
  closeMenu: () => void;
};

export function UsersMenu({ otherUsers, closeMenu }: Props) {
  return (
    <>
      <div onClick={closeMenu} className="fixed inset-0 z-10 h-screen w-screen" />
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute right-4 top-12 z-10 flex w-[250px] flex-col gap-2 rounded-lg border bg-main p-4 shadow-lg"
      >
        <p className="text-secondary mb-2 flex w-full justify-center">Select a user to chat with:</p>
        {otherUsers.map((otherUser) => (
          <UserCard closeMenu={closeMenu} key={otherUser.id} otherUser={otherUser} />
        ))}
      </motion.div>
    </>
  );
}
