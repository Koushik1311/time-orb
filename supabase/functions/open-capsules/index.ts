import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async () => {
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

    const { data: tokens } = await supabase
      .from("user_push_tokens")
      .select("token")
      .eq("user_id", capsule.user_id);

    for (const t of tokens ?? []) {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: t.token,
          title: "⏳ Time Capsule Ready",
          body: capsule.title ?? "Your capsule is ready to open",
        }),
      });
    }
  }

  return new Response("Done");
});
