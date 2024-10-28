"use server";

import prisma from "@/utils/prisma";
import { createClient, getUser } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function logInWithEmailAndPassword(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function registerWithEmailAndPassword(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  // Create user in the public schema
  const user = await getUser();

  if (user) {
    await prisma.userProfile.upsert({
      where: {
        id: user.id,
      },
      create: {
        id: user.id,
        username: user.user_metadata.full_name || "",
        user_metadata: user.user_metadata || "",
      },
      update: {
        username: user.user_metadata.full_name || "", // Update with username if provided
        user_metadata: user.user_metadata || "",
      },
    });
  }

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function signInWithProvider(provider: Provider) {
  const supabase = createClient();

  console.log(
    "In signInWithProvider server action. NEXT_PUBLIC_BASE_URL: ",
    process.env.NEXT_PUBLIC_BASE_URL,
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
    },
  });

  if (error) {
    return { error: error.message, url: null };
  }

  if (data.url) {
    return { error: null, url: data.url };
  }

  return { error: null, url: null };
}
