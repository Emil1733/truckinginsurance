-- 1. Create LEADS table
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  source text default 'reinstatement_guide',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Security (Allow anyone to INSERT, only Admins to SELECT)
alter table public.leads enable row level security;

-- Allow public inserts (The "Trap")
create policy "Allow generic inserts" on public.leads for insert with check (true);

-- Only allow service role (admin) to read
create policy "Enable access to service_role" on public.leads for select using (auth.role() = 'service_role');
