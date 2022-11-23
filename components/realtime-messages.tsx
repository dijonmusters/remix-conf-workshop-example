import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SupabaseOutletContext } from "~/root";
import { Database } from "db_types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export default function RealtimeMessages({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const [messages, setPosts] = useState(serverMessages);
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  useEffect(() => {
    setPosts(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) =>
          setPosts((messages) => [...messages, payload.new as Message])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverMessages]);

  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
