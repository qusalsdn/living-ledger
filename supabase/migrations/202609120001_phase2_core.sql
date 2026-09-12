-- Run this in Supabase SQL Editor before using the Phase 2 screens.
create table if not exists public.fixed_costs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  amount integer not null check (amount > 0),
  frequency text not null check (frequency in ('매월', '매년')),
  payment_day smallint not null check (payment_day between 1 and 31),
  category text not null check (category in ('주거', '공과금', '통신', '보험', '교통', '생활', '기타')),
  is_autopay boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  start_date date not null,
  end_date date not null,
  memo text check (char_length(memo) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

alter table public.fixed_costs enable row level security;
alter table public.contracts enable row level security;

create policy "Users manage their own fixed costs" on public.fixed_costs
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users manage their own contracts" on public.contracts
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create index if not exists fixed_costs_user_id_idx on public.fixed_costs(user_id);
create index if not exists contracts_user_id_end_date_idx on public.contracts(user_id, end_date);
