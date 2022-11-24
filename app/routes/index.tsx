import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Login from "components/login";
import RealtimeMessages from "components/realtime-messages";
import createServerClient from "utils/supabase.server";


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

  return null;
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data: messages } = await supabase.from("messages").select();

  return json({ messages : messages || [] }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <>
      <Login />
      <RealtimeMessages serverMessages={messages} />
      <Form method="post">
        <input type="text" name="message" placeholder="hello world" />
        <button type="submit">Send</button>
      </Form>
    </>
  );
}
