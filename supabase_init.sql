-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Violations Table (Vector 1)
create table public.violations (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique, -- "395.8e"
  slug text not null unique, -- "395-8e-false-logs"
  official_name text not null,
  layman_name text not null,
  fine_avg integer not null,
  severity_tier integer not null, -- 1 to 10
  rehab_steps jsonb not null default '[]'::jsonb,
  content_markdown text, -- Optional rich content for "Head" pages
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. State Filings Table (Vector 2)
create table public.state_filings (
  id uuid primary key default uuid_generate_v4(),
  state_code text not null, -- "CA"
  form_id text not null, -- "MCP-65"
  slug text not null unique,
  official_name text not null,
  purpose text not null,
  processing_days_manual integer,
  processing_days_electronic integer,
  penalty_per_day integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Trailer Risk Profiles (Vector 3)
create table public.trailer_risk_profiles (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique, -- "9-car-stinger"
  display_name text not null,
  min_cargo_limit integer not null,
  common_exclusions jsonb default '[]'::jsonb,
  premium_multiplier numeric(3, 1), -- e.g. 1.5
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.violations enable row level security;
alter table public.state_filings enable row level security;
alter table public.trailer_risk_profiles enable row level security;

-- Create Policies (Public Read Access)
create policy "Allow Public Read Access" on public.violations for select using (true);
create policy "Allow Public Read Access" on public.state_filings for select using (true);
create policy "Allow Public Read Access" on public.trailer_risk_profiles for select using (true);

-- Create Policies (Service Role Write Access - Implicit, but good to be explicit if using Admin API)
-- Note: Service role bypasses RLS, but we can add an "Authenticated Admin" policy if you have auth set up.
