-- Public profile rows for displaying sender info (avatar, name, email) outside auth.users.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);

alter table public.profiles enable row level security;

-- Anyone who can read messages can read profile display fields (public feed UX).
create policy profiles_select_all
  on public.profiles
  for select
  to anon, authenticated
  using (true);

create policy profiles_insert_own
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.profiles_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at_trg on public.profiles;

create trigger profiles_set_updated_at_trg
  before update on public.profiles
  for each row
  execute function public.profiles_set_updated_at();

-- Seed profile when a new auth user is created (OAuth metadata when present).
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    nullif(
      trim(
        coalesce(
          new.raw_user_meta_data->>'full_name',
          new.raw_user_meta_data->>'name',
          ''
        )
      ),
      ''
    ),
    nullif(
      trim(
        coalesce(
          new.raw_user_meta_data->>'avatar_url',
          new.raw_user_meta_data->>'picture',
          ''
        )
      ),
      ''
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profiles on auth.users;

create trigger on_auth_user_created_profiles
  after insert on auth.users
  for each row
  execute function public.handle_new_user_profile();

-- Backfill profiles for users created before this migration.
insert into public.profiles (id, email, full_name, avatar_url)
select
  u.id,
  u.email,
  nullif(
    trim(
      coalesce(
        u.raw_user_meta_data->>'full_name',
        u.raw_user_meta_data->>'name',
        ''
      )
    ),
    ''
  ),
  nullif(
    trim(
      coalesce(
        u.raw_user_meta_data->>'avatar_url',
        u.raw_user_meta_data->>'picture',
        ''
      )
    ),
    ''
  )
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

grant select on table public.profiles to anon, authenticated;
grant insert, update on table public.profiles to authenticated;
