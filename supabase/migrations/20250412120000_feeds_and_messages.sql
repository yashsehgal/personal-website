-- Feeds and messages for the personal feed feature.
-- Public feeds are visible to everyone; private feeds only to their creator when signed in.

create table public.feeds (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  is_public boolean not null default false,
  created_by_user_id uuid references auth.users (id) on delete set null,
  constraint feeds_name_unique unique (name)
);

create index feeds_created_by_user_id_idx on public.feeds (created_by_user_id);
create index feeds_is_public_idx on public.feeds (is_public);

create table public.feed_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  feed_id uuid not null references public.feeds (id) on delete cascade,
  content text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  constraint feed_messages_content_not_empty check (char_length(trim(content)) > 0)
);

create index feed_messages_feed_id_created_at_idx on public.feed_messages (feed_id, created_at desc);
create index feed_messages_user_id_idx on public.feed_messages (user_id);

alter table public.feeds enable row level security;
alter table public.feed_messages enable row level security;

-- Feeds: readable when public, or when the viewer is the creator (authenticated).
create policy feeds_select_visible
  on public.feeds
  for select
  to anon, authenticated
  using (
    is_public
    or (auth.uid() is not null and created_by_user_id = auth.uid())
  );

-- Authenticated users may create feeds they own.
create policy feeds_insert_own
  on public.feeds
  for insert
  to authenticated
  with check (
    created_by_user_id = auth.uid()
  );

-- Only the creator may update their own feeds (not system-seeded rows with null owner).
create policy feeds_update_own
  on public.feeds
  for update
  to authenticated
  using (
    created_by_user_id is not null
    and created_by_user_id = auth.uid()
  )
  with check (
    created_by_user_id = auth.uid()
  );

create policy feeds_delete_own
  on public.feeds
  for delete
  to authenticated
  using (
    created_by_user_id is not null
    and created_by_user_id = auth.uid()
  );

-- Messages: visible when the parent feed is visible to the reader.
create policy feed_messages_select_visible
  on public.feed_messages
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.feeds f
      where f.id = feed_messages.feed_id
        and (
          f.is_public
          or (auth.uid() is not null and f.created_by_user_id = auth.uid())
        )
    )
  );

-- Authenticated users may post only to feeds they can access, as themselves.
create policy feed_messages_insert_own
  on public.feed_messages
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.feeds f
      where f.id = feed_messages.feed_id
        and (
          f.is_public
          or f.created_by_user_id = auth.uid()
        )
    )
  );

create policy feed_messages_update_own
  on public.feed_messages
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy feed_messages_delete_own
  on public.feed_messages
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Two hard-coded public feeds (idempotent when re-run manually: use ON CONFLICT).
insert into public.feeds (name, is_public, created_by_user_id)
values
  ('hello', true, null),
  ('design', true, null)
on conflict (name) do update
set
  is_public = excluded.is_public,
  created_by_user_id = excluded.created_by_user_id;

grant select on table public.feeds to anon, authenticated;
grant insert, update, delete on table public.feeds to authenticated;

grant select on table public.feed_messages to anon, authenticated;
grant insert, update, delete on table public.feed_messages to authenticated;
