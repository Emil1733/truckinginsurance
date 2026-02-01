-- 1. Enable UUID extension (Required for uuid_generate_v4)
create extension if not exists "uuid-ossp";

-- 2. Ensure table exists (Safe idempotent check)
-- We use gen_random_uuid() which is built-in to Postgres 13+ as a backup if uuid-ossp fails
create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    source text default 'website',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- 3. RESET SECURITY (The "Nuclear" Option)
-- First, enable RLS
alter table public.leads enable row level security;

-- DROP ALL EXISTING POLICIES to avoid conflicts or "hidden" blocks
drop policy if exists "Public can insert leads" on public.leads;
drop policy if exists "Anon can insert leads" on public.leads;
drop policy if exists "Everyone can insert leads" on public.leads;
drop policy if exists "Service role can read leads" on public.leads;

-- 4. CREATE THE "WIDE OPEN" INSERT POLICY
-- This allows ANYONE (logged in or not) to insert into this table.
create policy "Enable insert for all users"
on public.leads
for insert
to public
with check (true);

-- 5. Allow Service Role (Server) to read/write everything
create policy "Enable all access for service role"
on public.leads
for all
to service_role
using (true)
with check (true);

-- 6. Grant Permissions (Sometimes needed for new tables)
grant insert on public.leads to anon;
grant insert on public.leads to authenticated;
grant insert on public.leads to service_role;
