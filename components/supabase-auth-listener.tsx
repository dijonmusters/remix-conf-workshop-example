import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

import type { SupabaseClient } from "@supabase/auth-helpers-remix";

export default function SupabaseAuthListener({
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
        fetcher.submit(null, {
          method: "post",
          action: "/handle-supabase-auth",
        });
      }
    });
  }, [accessToken]);

  return null;
}
