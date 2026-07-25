-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).
-- Replace YOUR_ADMIN_EMAIL below with the email you'll log into /admin with,
-- then create that user under Authentication -> Users -> Add user.

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image_url text,
  seo_title text,
  seo_description text,
  seo_keywords text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on posts (published, published_at desc);

alter table posts enable row level security;

-- Anyone (including logged-out visitors) can read published posts.
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Only the admin account can create, read all (incl. drafts), update, or delete.
create policy "Admin can manage all posts"
  on posts for all
  using (auth.jwt() ->> 'email' = 'YOUR_ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'YOUR_ADMIN_EMAIL');

-- Keep updated_at current on every change.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row
  execute function set_updated_at();
