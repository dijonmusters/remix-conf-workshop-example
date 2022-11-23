[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/00ff00/00ff00.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/00ff00/00ff00.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Mutate Supabase data from Remix

1. Add a `Form` to submit a `message`.

   ```tsx
   <Form method="post">
     <input type="text" name="message" placeholder="hello world" />
     <button type="submit">Send</button>
   </Form>
   ```

2. Add an `action` to insert a new `message` into Supabase database.

   ```jsx
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
   ```

   > Does this work? Did we forget something? Check the browser console for helpful error.

3. Add an RLS policy for `insert`.

   ```sql
   create policy "Allow read access to messages for signed in users" on "public"."messages"
   as permissive on insert
   to authenticated
   using (user_id = auth.uid());
   ```

4. Update default value for `user_id` column to `auth.uid()`.

---

[👉 Next lesson](./10-implement-realtime.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
