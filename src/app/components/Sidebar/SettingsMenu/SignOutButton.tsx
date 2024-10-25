"use client";

import { signOut } from "@/app/actions/signOut";
import React from "react";

export function SignOutButton() {
  return (
    <button onClick={async () => await signOut()} className="rounded-lg px-4 py-2 text-red-600 hover:bg-hover">
      Sign Out
    </button>
  );
}
