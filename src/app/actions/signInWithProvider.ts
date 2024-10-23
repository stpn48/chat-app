"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function signInWithProvider(provider: Provider) {
  const supabase = createClient();

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
