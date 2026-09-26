-- PlateDex v4.3.4
-- Run this once in Supabase SQL Editor after deploying v4.3.4.
-- Shared profile cards need photo_path in the public RPC, and shared images use the public photo bucket.

update storage.buckets
set public = true
where id = 'plate-photos';

create or replace function public.get_public_share(p_token text)
returns jsonb
language plpgsql
security definer
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
        'spotted_date',p.spotted_date,'rarity',p.rarity,'label',p.label,
        'photo_path',p.photo_path
      ) order by p.created_at desc)
      from public.plates p where p.user_id=s.user_id
    ),'[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_public_share(text) from public;
grant execute on function public.get_public_share(text) to anon,authenticated;
