-- Create Leads Table
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  driver_name text not null,
  phone text not null,
  email text not null,
  violation_code text, -- optional, if they came from a specific page
  cdl_years integer,
  status text default 'new', -- new, contacted, quoted
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.leads enable row level security;

-- Policy: Allow ANONYMOUS INSERT (so public users can submit forms)
create policy "Allow Public Insert" on public.leads for insert with check (true);

-- Policy: Allow SERVICE ROLE SELECT (for admin dashboard later)
-- (Implicitly allowed for service role, but explicit for authenticated users if needed later)
