-- PHASE 7: CARRIER DASHBOARD SCHEMA
-- Run this to enable the "App" side of the platform.

-- 1. Create Carrier Profiles (Linked to Auth Users)
create table public.carrier_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  company_name text,
  usdot_number text unique, -- critical for "Claim Authority"
  mc_number text,
  fleet_size integer default 0,
  cargo_type text[], -- e.g. ['reefer', 'dry_van']
  onboarding_step integer default 1, -- 1=Profile, 2=Compliance, 3=Complete
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Saved Quotes (The "Wallet")
create table public.saved_quotes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.carrier_profiles(id) on delete cascade not null,
  quote_reference text not null, -- e.g. "Q-12345"
  carrier_name text, -- e.g. "Progressive"
  premium_estimate numeric,
  coverage_details jsonb,
  status text default 'DRAFT', -- DRAFT, BOUND, EXPIRED
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS (Security)
alter table public.carrier_profiles enable row level security;
alter table public.saved_quotes enable row level security;

-- 4. Policies (Users see only their own data)
create policy "Users can view own profile" 
on public.carrier_profiles for select 
using (auth.uid() = id);

create policy "Users can update own profile" 
on public.carrier_profiles for update 
using (auth.uid() = id);

create policy "Users can view own quotes" 
on public.saved_quotes for select 
using (auth.uid() = user_id);

create policy "Users can insert own quotes" 
on public.saved_quotes for insert 
with check (auth.uid() = user_id);

-- 5. Trigger: Auto-create profile on signup
-- (Optional, but good UX. For now we will create manually on onboarding).
