import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Login from "components/login";
import RealtimeMessages from "components/realtime-messages";
import createServerClient from "utils/supabase.server";
import { Database } from "db_types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export const action: ActionFunction = async ({ request }) => {
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

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data: messages } = await supabase.from("messages").select();

  return json({ messages }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<{ messages: Message[] }>();

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
