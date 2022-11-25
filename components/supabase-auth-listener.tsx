import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

import type { TypedSupabaseClient } from "~/root";

export default function SupabaseAuthListener({
  accessToken,
  supabase,
}: {
  accessToken?: string;
  supabase: TypedSupabaseClient;
}) {
  const fetcher = useFetcher();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        fetcher.submit(null, {
          method: "post",
          action: "/handle-supabase-auth",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [accessToken]);

  return null;
}
