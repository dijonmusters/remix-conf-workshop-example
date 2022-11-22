import { useFetcher } from "@remix-run/react";
import { SupabaseClient } from "@supabase/auth-helpers-remix";
import { useEffect } from "react";

export default function SupabaseListener({
  accessToken,
  supabase,
}: {
  accessToken?: string;
  supabase: SupabaseClient;
}) {
  const fetcher = useFetcher();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        fetcher.submit(null, { method: "post", action: "/handle-auth" });
      }
    });
  }, [accessToken]);

  return null;
}
