-- Blog posts table for Tech Immigrants
-- Run this in Supabase SQL Editor to create the blog_posts table

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null,
  cover_image text,
  tags text[] default '{}',
  language text not null default 'fa' check (language in ('fa', 'en')),
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blog_posts_slug on blog_posts (slug);
create index if not exists idx_blog_posts_published on blog_posts (published, published_at desc);
create index if not exists idx_blog_posts_language on blog_posts (language);
create index if not exists idx_blog_posts_tags on blog_posts using gin (tags);

-- Row-level security: public read for published posts
alter table blog_posts enable row level security;

create policy "Published blog posts are publicly readable"
  on blog_posts for select
  using (published = true);

-- Auto-update updated_at on row change
create or replace function update_blog_posts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row
  execute function update_blog_posts_updated_at();
