import { Form, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { SupabaseOutletContext } from "~/root";
import type { Database } from "db_types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export default function RealtimeMessages({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const [messages, setMessages] = useState(serverMessages);
  const { supabase, session } = useOutletContext<SupabaseOutletContext>();

  useEffect(() => {
    setMessages(serverMessages);
  }, [serverMessages]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;

          if (!messages.find((message) => message.id === newMessage.id)) {
            setMessages([...messages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages, supabase]);

  return session?.user ? (
    <>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
      <Form method="post" action="/?index">
        <input type="text" name="message" placeholder="hello world" />
        <button type="submit">Send</button>
      </Form>
    </>
  ) : null;
}
