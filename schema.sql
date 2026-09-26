create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'PlateDex user',
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.plates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plate text not null,
  origin_country text,
  origin_region text,
  spotted_city text,
  spotted_region text,
  spotted_country text,
  spotted_date date,
  rarity text not null default 'Common'
    check (rarity in ('Common','Rare','Epic','Legendary')),
  label text,
  notes text,
  latitude double precision,
  longitude double precision,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  title text not null default 'PlateDex Collection',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists plates_user_id_idx on public.plates(user_id);
create index if not exists shares_token_idx on public.shares(token);

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path=public
as $$
  select coalesce((select is_admin from public.profiles where id=auth.uid()),false);
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.plates enable row level security;
alter table public.shares enable row level security;

revoke all on public.profiles from anon, authenticated;
revoke all on public.plates from anon, authenticated;
revoke all on public.shares from anon, authenticated;

grant select,insert,update,delete on public.profiles to authenticated;
grant select,insert,update,delete on public.plates to authenticated;
grant select,insert,update,delete on public.shares to authenticated;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
using ((select auth.uid())=id or (select public.is_admin()));

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
using ((select auth.uid())=id or (select public.is_admin()))
with check ((select auth.uid())=id or (select public.is_admin()));

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert to authenticated
with check ((select auth.uid())=id or (select public.is_admin()));

drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles for delete to authenticated
using ((select public.is_admin()));

drop policy if exists plates_select on public.plates;
create policy plates_select on public.plates for select to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists plates_insert on public.plates;
create policy plates_insert on public.plates for insert to authenticated
with check ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists plates_update on public.plates;
create policy plates_update on public.plates for update to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()))
with check ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists plates_delete on public.plates;
create policy plates_delete on public.plates for delete to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists shares_select on public.shares;
create policy shares_select on public.shares for select to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists shares_insert on public.shares;
create policy shares_insert on public.shares for insert to authenticated
with check ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists shares_update on public.shares;
create policy shares_update on public.shares for update to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()))
with check ((select auth.uid())=user_id or (select public.is_admin()));

drop policy if exists shares_delete on public.shares;
create policy shares_delete on public.shares for delete to authenticated
using ((select auth.uid())=user_id or (select public.is_admin()));

-- Public share endpoint. It intentionally excludes private notes and exact coordinates.
create or replace function public.get_public_share(p_token text)
returns jsonb
language plpgsql security definer
set search_path=public
as $$
declare s public.shares; owner_name text;
begin
  select * into s from public.shares
  where token=p_token and enabled=true limit 1;
  if not found then return null; end if;

  select display_name into owner_name from public.profiles where id=s.user_id;

  return jsonb_build_object(
    'title',s.title,
    'owner',coalesce(owner_name,'PlateDex user'),
    'plates',coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',p.id,'plate',p.plate,'origin_country',p.origin_country,
        'origin_region',p.origin_region,'spotted_city',p.spotted_city,
        'spotted_region',p.spotted_region,'spotted_country',p.spotted_country,
        'spotted_date',p.spotted_date,'rarity',p.rarity,'label',p.label,'photo_path',p.photo_path
      ) order by p.created_at desc)
      from public.plates p where p.user_id=s.user_id
    ),'[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_public_share(text) from public;
grant execute on function public.get_public_share(text) to anon,authenticated;

-- Private photo bucket. Normal signed-in users can access only their own folder;
-- admins can access all folders.
insert into storage.buckets(id,name,public)
values('plate-photos','plate-photos',true)
on conflict(id) do update set public=true;

drop policy if exists plate_photos_select on storage.objects;
create policy plate_photos_select on storage.objects for select to authenticated
using(bucket_id='plate-photos' and (
  (storage.foldername(name))[1]=(select auth.uid())::text
  or (select public.is_admin())
));

drop policy if exists plate_photos_insert on storage.objects;
create policy plate_photos_insert on storage.objects for insert to authenticated
with check(bucket_id='plate-photos' and
  (storage.foldername(name))[1]=(select auth.uid())::text
);

drop policy if exists plate_photos_update on storage.objects;
create policy plate_photos_update on storage.objects for update to authenticated
using(bucket_id='plate-photos' and (
  (storage.foldername(name))[1]=(select auth.uid())::text
  or (select public.is_admin())
))
with check(bucket_id='plate-photos' and (
  (storage.foldername(name))[1]=(select auth.uid())::text
  or (select public.is_admin())
));

drop policy if exists plate_photos_delete on storage.objects;
create policy plate_photos_delete on storage.objects for delete to authenticated
using(bucket_id='plate-photos' and (
  (storage.foldername(name))[1]=(select auth.uid())::text
  or (select public.is_admin())
));
