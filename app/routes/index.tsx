import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Login from "components/login";
import RealtimeMessages from "components/realtime-messages";
import { createServerClient } from "utils/supabase.server";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const { message } = Object.fromEntries(await request.formData());

  const { error } = await supabase
    .from("messages")
    .insert({ content: String(message) });

  if (error) {
    console.log(error);
  }

  return json(null, { headers: response.headers });
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data: messages } = await supabase.from("messages").select();

  return json({ messages: messages || [] }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <>
      <Login />
      <RealtimeMessages serverMessages={messages} />
    </>
  );
}
