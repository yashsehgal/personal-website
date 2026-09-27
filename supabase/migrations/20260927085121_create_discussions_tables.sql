-- Anonymous public forum: anyone can read and insert. No updates or deletes.
-- Applied on production as version 20260927085121. Keep this file identical
-- across local and hosted environments so behavior stays in sync.

create table public.discussions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  created_at timestamptz not null default now(),
  constraint discussions_title_length check (char_length(trim(title)) between 1 and 200)
);

create table public.discussion_messages (
  id uuid primary key default gen_random_uuid(),
  discussion_id uuid not null references public.discussions (id) on delete cascade,
  body jsonb not null,
  created_at timestamptz not null default now(),
  constraint discussion_messages_body_object check (jsonb_typeof(body) = 'object')
);

create index discussions_created_at_idx
  on public.discussions (created_at desc);

create index discussion_messages_discussion_id_created_at_idx
  on public.discussion_messages (discussion_id, created_at);

alter table public.discussions enable row level security;
alter table public.discussion_messages enable row level security;

alter table public.discussions force row level security;
alter table public.discussion_messages force row level security;

create policy discussions_select
  on public.discussions
  for select
  to anon, authenticated
  using (true);

create policy discussions_insert
  on public.discussions
  for insert
  to anon, authenticated
  with check (char_length(trim(title)) between 1 and 200);

create policy discussion_messages_select
  on public.discussion_messages
  for select
  to anon, authenticated
  using (true);

create policy discussion_messages_insert
  on public.discussion_messages
  for insert
  to anon, authenticated
  with check (
    jsonb_typeof(body) = 'object'
    and exists (
      select 1
      from public.discussions as discussion
      where discussion.id = discussion_id
    )
  );

grant select, insert on table public.discussions to anon, authenticated;
grant select, insert on table public.discussion_messages to anon, authenticated;

revoke update, delete on table public.discussions from anon, authenticated;
revoke update, delete on table public.discussion_messages from anon, authenticated;
