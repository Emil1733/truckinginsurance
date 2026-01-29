-- Create State Filings Table (Vector 2)
create table public.state_filings (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  form_id text not null,
  state_code text not null,
  official_name text not null,
  purpose text,
  processing_days_manual integer,
  processing_days_electronic integer,
  penalty_per_day integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.state_filings enable row level security;

-- Policy: Allow Public Read
create policy "Enable read access for all users" on public.state_filings for select using (true);
