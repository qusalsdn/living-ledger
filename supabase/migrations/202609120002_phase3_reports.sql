-- Run after 202609120001_phase2_core.sql in Supabase SQL Editor.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  amount integer not null check (amount > 0),
  billing_day smallint not null check (billing_day between 1 and 31),
  category text not null check (category in ('영상', '음악', '생산성', '클라우드', '운동', '기타')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month date not null,
  fixed_cost_total integer not null check (fixed_cost_total >= 0),
  subscription_total integer not null check (subscription_total >= 0),
  total integer not null check (total >= 0),
  created_at timestamptz not null default now(),
  unique (user_id, month)
);

create table if not exists public.monthly_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 160),
  task_type text not null check (task_type in ('payment', 'contract', 'subscription')),
  due_date date,
  is_completed boolean not null default false,
  source_key text not null,
  month date not null,
  created_at timestamptz not null default now(),
  unique (user_id, source_key, month)
);

alter table public.subscriptions enable row level security;
alter table public.monthly_reports enable row level security;
alter table public.monthly_tasks enable row level security;

create policy "Users manage their own subscriptions" on public.subscriptions
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users manage their own monthly reports" on public.monthly_reports
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users manage their own monthly tasks" on public.monthly_tasks
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists monthly_reports_user_id_month_idx on public.monthly_reports(user_id, month desc);
create index if not exists monthly_tasks_user_id_month_idx on public.monthly_tasks(user_id, month, is_completed);
