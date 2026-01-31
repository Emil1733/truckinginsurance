-- PHASE 7.3: MY FLEET SCHEMA
-- Run this to enable Vehicle Management.

-- 1. Create Fleet Table
create table public.carrier_fleet (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.carrier_profiles(id) on delete cascade not null,
  unit_number text, -- e.g. "Truck-101"
  vin text, -- Vehicle Identification Number
  make text,
  model text,
  year integer,
  type text, -- 'Tractor', 'Trailer', 'Box Truck'
  status text default 'ACTIVE', -- ACTIVE, SOLD, MAINTENANCE
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.carrier_fleet enable row level security;

-- 3. Policies
create policy "Users can view own fleet" 
on public.carrier_fleet for select 
using (auth.uid() = user_id);

create policy "Users can manage own fleet" 
on public.carrier_fleet for all 
using (auth.uid() = user_id);
