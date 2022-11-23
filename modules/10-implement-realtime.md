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
[![Implement Realtime](https://placehold.co/15x15/00ff00/00ff00.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Implement Realtime

1. Ensure [replication is enabled](https://app.supabase.com/project/_/database/replication) for the `messages` table.
2. Create `<RealtimeMessages />` component.

   ```tsx
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
           (payload) =>
             setPosts((messages) => [...messages, payload.new as any])
         )
         .subscribe();

       return () => {
         supabase.removeChannel(channel);
       };
     }, [serverMessages]);

     return <pre>{JSON.stringify(messages, null, 2)}</pre>;
   }
   ```

3. Render `<RealtimeMessages />` component from `app/routes/index.tsx`.

---

[👉 Next lesson](./11-deploy-to-vercel.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
