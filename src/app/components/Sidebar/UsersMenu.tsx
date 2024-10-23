import { getUsers } from "@/app/actions/getUsers";
import React from "react";

export async function UsersMenu() {
  const { data: users, error } = await getUsers();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      zmrd
    </div>
  );
}
