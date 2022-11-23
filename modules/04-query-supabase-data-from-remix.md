[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/555555/555555.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/555555/555555.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/555555/555555.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/555555/555555.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/555555/555555.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Query Supabase Data from Remix

1. Install `@supabase/supabase-js`.

   ```bash
   npm install @supabase/supabase-js
   ```

2. Add `.env` file with following values.

   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   > Get these values from [API Settings in your Supabase project's dashboard](https://app.supabase.com/project/_/settings/api).

3. Create Supabase Client util function.

   ```tsx
   // utils/supabase.ts

   import { createClient } from "@supabase/supabase-js";

   export default createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!
   );
   ```

4. Query data from Supabase.

   > Check out the [auto-generated docs in your Supabase project's dashboard](https://app.supabase.com/project/_/api).

5. Write RLS policy to allow read access to `messages`.

<details>
  <summary>Solution</summary>

```tsx
// app/routes/index.tsx

import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

export const loader = async ({ request }: LoaderArgs) => {
  const { data: messages } = await supabase.from("messages").select();
  return json({ messages });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
```

```sql
create policy "Allow read access for messages" on public.messages
for select using (true);
```

</details>

## Optional

4. Add types

   Types can be generated from the [Supabase CLI](https://supabase.com/docs/reference/cli).

   ```bash
   supabase gen types typescript --project-id your-project-ref >> db_types.ts
   ```

   > This will need to be run any time you make changes to your Supabase schema

   ```tsx
   import { createClient } from "@supabase/supabase-js";
   import { Database } from "db_types";

   export default createClient<Database>(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!
   );
   ```

---

[👉 Next lesson](./05-add-client-auth.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
