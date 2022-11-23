[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/00ff00/00ff00.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/00ff00/00ff00.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/555555/555555.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Add Supabase Auth Listener

1. Add a `<SupabaseAuthListener />` component

   ```tsx
   import { useFetcher } from "@remix-run/react";
   import { SupabaseClient } from "@supabase/auth-helpers-remix";
   import { useEffect } from "react";

   export default function SupabaseListener({
     accessToken,
     supabase,
   }: {
     accessToken?: string;
     supabase: SupabaseClient;
   }) {
     const fetcher = useFetcher();

     useEffect(() => {
       supabase.auth.onAuthStateChange((event, session) => {
         if (session?.access_token !== accessToken) {
           fetcher.submit(null, { method: "post", action: "/handle-auth" });
         }
       });
     }, [accessToken]);

     return null;
   }
   ```

2. Create an action at `app/routes/handle-auth.tsx`.

   ```tsx
   export const action = () => {
     return null;
   };
   ```

3. Render above `<Outlet />` in `app/root.tsx`.

   ```tsx
   <SupabaseListener
     supabase={supabase}
     accessToken={session?.access_token}
   />
   <Outlet context={{ supabase, session }} />
   ```

---

[👉 Next lesson](./09-mutate-supabase-data-from-remix.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
