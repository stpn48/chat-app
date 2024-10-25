import React from "react";
import { GoogleButton } from "./components/GoogleButton";

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">chat-app login</h1>
      <GoogleButton />

      <p className="absolute bottom-4 left-4 text-xs text-secondary">2024® random-chat-app All Rights Reserved</p>
    </div>
  );
}
