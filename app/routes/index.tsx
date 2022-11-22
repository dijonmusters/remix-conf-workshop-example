import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import RealtimeMessages from "components/realtime-messages";
import createServerClient from "utils/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { message } = Object.fromEntries(await request.formData());

  const { error } = await supabase
    .from("messages")
    .insert({ content: message });

  if (error) {
    console.log(error);
  }

  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data } = await supabase.from("messages").select();

  return json({ data }, { headers: response.headers });
};

export default function Index() {
  const { data } = useLoaderData();

  return (
    <>
      <RealtimeMessages serverMessages={data} />
      <Form method="post">
        <input type="text" name="message" placeholder="hello world" />
        <button type="submit">Send</button>
      </Form>
    </>
  );
}
