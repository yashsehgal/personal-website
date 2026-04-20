-- Threading (reply_to_message_id) and anonymous messages (nullable user_id).

alter table public.feed_messages
  add column if not exists reply_to_message_id uuid references public.feed_messages (id) on delete cascade;

alter table public.feed_messages
  alter column user_id drop not null;

create index if not exists feed_messages_reply_to_message_id_idx
  on public.feed_messages (reply_to_message_id)
  where reply_to_message_id is not null;

create index if not exists feed_messages_feed_id_reply_null_idx
  on public.feed_messages (feed_id, created_at desc)
  where reply_to_message_id is null;

-- Ensure replies reference a parent in the same feed.
create or replace function public.feed_messages_enforce_reply_same_feed()
returns trigger
language plpgsql
as $$
begin
  if new.reply_to_message_id is null then
    return new;
  end if;

  if exists (
    select 1
    from public.feed_messages parent
    where parent.id = new.reply_to_message_id
      and parent.feed_id is distinct from new.feed_id
  ) then
    raise exception 'reply_to_message_id must reference a message in the same feed';
  end if;

  return new;
end;
$$;

drop trigger if exists feed_messages_enforce_reply_same_feed_trg on public.feed_messages;

create trigger feed_messages_enforce_reply_same_feed_trg
  before insert or update of feed_id, reply_to_message_id
  on public.feed_messages
  for each row
  execute function public.feed_messages_enforce_reply_same_feed();

drop policy if exists feed_messages_select_visible on public.feed_messages;
drop policy if exists feed_messages_insert_own on public.feed_messages;
drop policy if exists feed_messages_update_own on public.feed_messages;
drop policy if exists feed_messages_delete_own on public.feed_messages;

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

-- Signed-in users post as themselves to feeds they can access.
create policy feed_messages_insert_authenticated
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

-- Anonymous posts: public feeds only, sender must be null.
create policy feed_messages_insert_anonymous
  on public.feed_messages
  for insert
  to anon
  with check (
    user_id is null
    and exists (
      select 1
      from public.feeds f
      where f.id = feed_messages.feed_id
        and f.is_public = true
    )
  );

create policy feed_messages_update_sender
  on public.feed_messages
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy feed_messages_delete_sender
  on public.feed_messages
  for delete
  to authenticated
  using (user_id = auth.uid());

grant insert on table public.feed_messages to anon;
