-- Public channel "general" (idempotent with existing feeds seed pattern).

insert into public.feeds (name, is_public, created_by_user_id)
values ('general', true, null)
on conflict (name) do update
set
  is_public = excluded.is_public,
  created_by_user_id = excluded.created_by_user_id;
