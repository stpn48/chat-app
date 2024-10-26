"use client";

import { UserProfile } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";
import { UserCard } from "./UserCard";

type Props = {
  otherUsers: UserProfile[];
  closeMenu: () => void;
  className?: string;
};

export function UsersMenu({ otherUsers, closeMenu, className }: Props) {
  return (
    <>
      <div onClick={closeMenu} className="fixed inset-0 z-10 h-screen w-screen" />
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={twMerge(
          "absolute right-4 z-10 flex w-[250px] flex-col gap-2 rounded-lg border border-main bg-main p-4 shadow-lg dark:border-dark-main dark:bg-dark-main",
          className,
        )}
      >
        <p className="mb-2 flex w-full justify-center bg-secondary text-secondary">
          Select a user to chat with:
        </p>
        {otherUsers.map((otherUser) => (
          <UserCard closeMenu={closeMenu} key={otherUser.id} otherUser={otherUser} />
        ))}
      </motion.div>
    </>
  );
}
