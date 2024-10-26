import { UserProfile } from "@prisma/client";
import { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import React from "react";

type Props = {
  user: UserProfile;
  hideName?: boolean;
};

export function UserCredentials({ user, hideName }: Props) {
  const chattingWithUserMetadata = user.user_metadata as UserMetadata;
  return (
    <div className="flex items-center gap-3">
      {chattingWithUserMetadata.avatar_url && (
        <Image
          className="rounded-full"
          src={(user.user_metadata as UserMetadata).avatar_url}
          width={32}
          height={32}
          alt="avatar"
        />
      )}

      {!(chattingWithUserMetadata as UserMetadata).avatar_url && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 bg-secondary">
          <h1 className="text-white">{chattingWithUserMetadata.email[0].toUpperCase()}</h1>
        </div>
      )}

      {!hideName && <h1>{user.username || chattingWithUserMetadata.email}</h1>}
    </div>
  );
}
