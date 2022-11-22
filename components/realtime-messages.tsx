import { useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";

export default function RealtimeMessages({
  serverMessages,
}: {
  serverMessages: any[];
}) {
  const [messages, setPosts] = useState(serverMessages);
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();

  useEffect(() => {
    setPosts(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => setPosts((messages) => [...messages, payload.new as any])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverMessages]);

  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
