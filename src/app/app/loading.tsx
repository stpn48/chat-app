import { LoadingSpinner } from "@/components/LoadingSpinner";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
