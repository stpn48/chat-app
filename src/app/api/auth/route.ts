import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import prisma from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      if (user) {
        await prisma.userProfile.upsert({
          where: {
            id: user.id,
          },
          create: {
            id: user.id,
            username: user.user_metadata.full_name || "",
            user_metadata: user.user_metadata,
          },
          update: {
            username: user.user_metadata.full_name || "", // Update with username if provided
            user_metadata: user.user_metadata,
          },
        });
      }

      return NextResponse.redirect(`${origin}/app`);
    } else {
      // Redirect with error query param on failure
      return NextResponse.redirect(`${origin}/app?error=${encodeURIComponent(error.message)}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/sign-in`);
}
