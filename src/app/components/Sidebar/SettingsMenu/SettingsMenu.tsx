"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { SettingsButton } from "./SettingsButton";
import { SignOutButton } from "./SignOutButton";

export function SettingsMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {showMenu && (
          <>
            <div className="fixed left-0 top-0 z-10 h-screen w-screen" onClick={() => setShowMenu(false)} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute -top-[200px] z-10 flex w-fit flex-col gap-2 rounded-lg border border-main bg-secondary p-2 shadow-lg"
            >
              <button className="rounded-lg px-4 py-2 hover:bg-hover">Privacy</button>
              <button className="rounded-lg px-4 py-2 hover:bg-hover">Change Theme</button>
              <button className="rounded-lg px-4 py-2 hover:bg-hover">Help</button>
              <SignOutButton />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SettingsButton onClick={() => setShowMenu(true)} />
    </div>
  );
}
