"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUsers() {
  const supabase = createClient();
}
