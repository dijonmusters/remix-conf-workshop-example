[🏡 Home](../README.md)

[![What are we doing here](https://placehold.co/15x15/00ff00/00ff00.png)](./01-what-are-we-doing-here.md)
[![Create a Supabase project](https://placehold.co/15x15/00ff00/00ff00.png)](./02-create-a-supabase-project.md)
[![Create a Remix Application](https://placehold.co/15x15/00ff00/00ff00.png)](./03-create-a-remix-application.md)
[![Query Supabase Data from Remix](https://placehold.co/15x15/00ff00/00ff00.png)](./04-query-supabase-data-from-remix.md)
[![Add Supabase Auth (client-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./05-add-client-auth.md)
[![Add Supabase Auth (server-side)](https://placehold.co/15x15/00ff00/00ff00.png)](./06-add-server-auth.md)
[![Authorization with RLS Policies](https://placehold.co/15x15/00ff00/00ff00.png)](./07-authorization-with-rls-policies.md)
[![Add Supabase Auth Listener](https://placehold.co/15x15/555555/555555.png)](./08-add-supabase-auth-listener.md)
[![Mutate Supabase Data from Remix](https://placehold.co/15x15/555555/555555.png)](./09-mutate-supabase-data-from-remix.md)
[![Implement Realtime](https://placehold.co/15x15/555555/555555.png)](./10-implement-realtime.md)
[![Deploy to Vercel](https://placehold.co/15x15/555555/555555.png)](./11-deploy-to-vercel.md)
[![Wrapping up](https://placehold.co/15x15/555555/555555.png)](./12-wrapping-up.md)

# Authorization with RLS Policies

1. Add column for `user_id`. This needs to have a foreign key relationship to the `id` column of the `auth.users` table.
2. Modify RLS policy to only allow signed in users to read `messages`.

> There is a bug 🐞! Try logging in and out. Then refresh. What is going on here?!?

---

<details>
  <summary>Solution</summary>

```sql
drop table messages;

create table messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text,
  user_id uuid references auth.users default auth.uid() not null
);

alter table public.messages enable row level security;

create policy "Allow read access to messages for signed in users" on "public"."messages"
as permissive on select
to authenticated
using (true);
```

</details>

---

[👉 Next lesson](./08-add-supabase-auth-listener.md)

---

Enjoyed the course? Follow me on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to my [YouTube channel](https://www.youtube.com/jonmeyers).

```

```
