import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
