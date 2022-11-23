[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/555555/555555.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/555555/555555.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/555555/555555.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/555555/555555.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Add Supabase Auth (client-side)

1. [Create GitHub OAuth app](https://supabase.com/docs/guides/auth/auth-github)
2. Create `<Login />` component

   ```tsx
   // components/login.tsx

   import supabase from "utils/supabase.ts";

   export default function Login() {
     const handleLogin = async () => {
       const { error } = await supabase.auth.signInWithOAuth({
         provider: "github",
       });

       if (error) {
         console.log(error);
       }
     };

     const handleLogout = async () => {
       const { error } = await supabase.auth.signOut();

       if (error) {
         console.log(error);
       }
     };

     return (
       <>
         <button onClick={handleLogout}>Logout</button>
         <button onClick={handleLogin}>Login</button>
       </>
     );
   }
   ```

   > If we try to render this component in `app/routes/index.tsx` we will notice a big error! Check browser console!

3. Rename file `utils/supabase.server.ts`.

4. Pass through environment variables from `loader`.

   ```tsx
   // app/root.tsx
   import { json, LoaderArgs } from "@remix-run/node";
   import Login from "components/login.tsx";

   export const loader = async ({}: LoaderArgs) => {
     const env = {
       SUPABASE_URL: process.env.SUPABASE_URL!,
       SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
     };

     return {
       env,
     };
   };

   export default function App() {
     const { env } = useLoaderData<typeof loader>();

     const supabase = createBrowserClient<Database>(
       env.SUPABASE_URL,
       env.SUPABASE_ANON_KEY
     );

     return (
       // other jsx stuff omitted
       <Outlet context={{ supabase }} />
     );
   }
   ```

5. Pass through `session` from `loader`.

   ```tsx
   // app/root.tsx

   import Login from "components/login.tsx";
   import supabase from "utils/supabase.server";

   export const loader: LoaderFunction = async () => {
     const {
       data: { session },
     } = await supabase.auth.getSession();

     const env = {
       SUPABASE_URL: process.env.SUPABASE_URL,
       SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
     };

     return {
       env,
       session,
     };
   };

   export default function App() {
     const { env, session } = useLoaderData();

     const supabase = createBrowserClient<Database>(
       env.SUPABASE_URL,
       env.SUPABASE_ANON_KEY
     );

     return (
       // other jsx stuff omitted
       <Outlet context={{ supabase, session }} />
     );
   }
   ```

6. Conditionally render `login` or `logout` button depending on user

   ```tsx
   import { useOutletContext } from "@remix-run/react";

   export default function Login() {
     const { supabase, session } = useOutletContext();

     const handleLogin = async () => {
       const { error } = await supabase.auth.signInWithOAuth({
         provider: "github",
       });

       if (error) {
         console.log(error);
       }
     };

     const handleLogout = async () => {
       const { error } = await supabase.auth.signOut();

       if (error) {
         console.log(error);
       }
     };

     return !!session?.user ? (
       <button onClick={handleLogout}>Logout</button>
     ) : (
       <button onClick={handleLogin}>Login</button>
     );
   }
   ```

Something weird is going on with the session. Try adding this blob to the `<Login />` component to work out what is going on:

```tsx
useEffect(() => {
  supabase.auth.getUser().then((user) => console.log({ useEffect: { user } }));
}, []);
```

The server session is not being set correctly.

---

[👉 Next lesson](./06-add-server-auth.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).
