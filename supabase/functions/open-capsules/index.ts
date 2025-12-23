// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const now = new Date().toISOString();

  const { data: capsules } = await supabase
    .from("capsules")
    .select("id, user_id, title")
    .lte("open_at", now)
    .eq("opened", false);

  for (const capsule of capsules ?? []) {
    await supabase
      .from("capsules")
      .update({ opened: true })
      .eq("id", capsule.id);

    // 📧 placeholder for email notification
    console.log(
      `📬 Capsule opened for user ${capsule.user_id}: ${capsule.title}`,
    );
  }

  return new Response("OK");
});
