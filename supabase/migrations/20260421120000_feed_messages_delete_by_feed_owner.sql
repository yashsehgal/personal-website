-- Allow feed owners to delete any message in their feeds (including anonymous posts)
-- so ON DELETE CASCADE from public.feeds to public.feed_messages succeeds under RLS.

create policy feed_messages_delete_feed_owner
  on public.feed_messages
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.feeds f
      where f.id = feed_messages.feed_id
        and f.created_by_user_id is not null
        and f.created_by_user_id = auth.uid()
    )
  );
