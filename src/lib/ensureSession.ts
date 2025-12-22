import { supabase } from "@/utils/supabase";

export async function ensureSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.warn("getSession error", error);
    return;
  }

  if (!data.session) {
    const { error: anonError } = await supabase.auth.signInAnonymously();

    if (anonError) {
      console.error("Anonymous sign-in failed", anonError);
    }
  }
}
