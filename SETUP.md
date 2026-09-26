# PlateDex Supabase setup

1. Run `schema.sql` in Supabase SQL Editor.
2. In Authentication > Users, create your own email/password user.
3. Copy your user's UUID.
4. Run:

```sql
insert into public.profiles (id, display_name, is_admin)
values ('YOUR-UUID-HERE', 'Emil', true)
on conflict (id) do update set is_admin = true;
```

5. Create friends in Authentication > Users, then add profiles:

```sql
insert into public.profiles (id, display_name, is_admin)
values ('FRIEND-UUID', 'Friend name', false)
on conflict (id) do update set display_name = excluded.display_name;
```

6. Disable public signups in Supabase Auth settings.

Never put your database password or Supabase secret/service-role key into the website or GitHub.
