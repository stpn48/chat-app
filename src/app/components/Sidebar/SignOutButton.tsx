"use client";

import { signOut } from "@/app/actions/signOut";
import React from "react";

export function SignOutButton() {
  return (
    <button className="absolute bottom-4 right-4" onClick={async () => await signOut()}>
      Sign out
    </button>
  );
}
