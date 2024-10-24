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
      <div onClick={closeMenu} className="w-screen z-10 h-screen fixed inset-0" />
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col z-10 right-4 absolute top-10 gap-2 w-[250px] p-4 border rounded-lg shadow-lg bg-main"
      >
        {otherUsers.map((otherUser) => (
          <UserCard key={otherUser.id} otherUser={otherUser} />
        ))}
      </motion.div>
    </>
  );
}
