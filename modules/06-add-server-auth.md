[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/555555/555555.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/555555/555555.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/555555/555555.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Add Supabase Auth (server-side)

1. Install `@supabase/auth-helpers-remix`.

   ```bash
   npm install @supabase/auth-helpers-remix
   ```

2. Refactor to use `createServerClient` and `createBrowserClient`.

   ```ts
   // utils/supabase.server.ts

   import { createServerClient } from "@supabase/auth-helpers-remix";

   export default ({
     request,
     response,
   }: {
     request: Request;
     response: Response;
   }) =>
     createServerClient(
       process.env.SUPABASE_URL!,
       process.env.SUPABASE_ANON_KEY!,
       { request, response }
     );
   ```

   ```tsx
   // app/root.tsx

   export const loader: LoaderFunction = async ({ request }) => {
     const response = new Response();
     const supabase = createServerClient({ request, response });

     const {
       data: { user },
     } = await supabase.auth.getUser();

     const env = {
       SUPABASE_URL: process.env.SUPABASE_URL,
       SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
     };

     return json(
       {
         env,
         user,
       },
       {
         headers: response.headers,
       }
     );
   };
   ```

---

[👉 Next lesson](./07-authorization-with-rls-policies.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
