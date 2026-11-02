-- Voice SaaS V1 — Supabase schema (V2 wiring step)
-- Run in Supabase Dashboard → SQL Editor → New query → Run.
-- NOTE: V1 does NOT read Supabase yet. It runs on the in-memory DEMO
-- credit ledger in lib/credits.ts, which resets on redeploy.
-- After running this schema and setting env vars, wire lib/ to Supabase
-- (profiles -> credit_balances -> generations) and remove the DEMO label.
-- Until then, nothing here is live — do not claim otherwise.
-- Privacy: generations store lengths/voice/model ONLY — never user text,
-- never any API key.

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists plans (
  id text primary key,
  name text not null,
  price_bdt numeric not null default 0,
  price_usd numeric not null default 0,
  chars_per_month integer not null default 0,
  is_draft boolean not null default true,
  created_at timestamptz not null default now()
);

-- DRAFT plans (owner approval required before selling — see /pricing).
insert into plans (id, name, price_bdt, price_usd, chars_per_month, is_draft)
values
  ('trial', 'ফ্রি ট্রায়াল', 0, 0, 1000, true),
  ('starter', 'স্টার্টার', 499, 5, 30000, true),
  ('creator', 'ক্রিয়েটর', 1499, 15, 120000, true),
  ('pro', 'প্রো', 4999, 49, 500000, true)
on conflict (id) do nothing;

create table if not exists credit_balances (
  user_id uuid primary key references profiles(id) on delete cascade,
  plan_id text not null default 'trial' references plans(id),
  total_chars integer not null default 1000,
  used_chars integer not null default 0 check (used_chars >= 0),
  period_start date not null default current_date,
  updated_at timestamptz not null default now()
);

create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  chars integer not null check (chars > 0),
  voice_id text not null,
  voice_name text not null default '',
  model_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists generations_user_created_idx
  on generations (user_id, created_at desc);

-- RLS: enable now; policies are added in V2 when auth is wired.
-- Until then, keep the service-role key server-side ONLY.
alter table profiles enable row level security;
alter table plans enable row level security;
alter table credit_balances enable row level security;
alter table generations enable row level security;
