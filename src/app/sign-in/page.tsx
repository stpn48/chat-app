import React from "react";
import { GoogleButton } from "./components/GoogleButton";

export default function SignInPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-2xl">Continue With Google</h1>
        <GoogleButton />
      </div>
    </div>
  );
}
