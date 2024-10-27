import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { PageContainer } from "./components/PageContainer";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}
