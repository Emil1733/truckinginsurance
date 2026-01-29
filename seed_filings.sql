-- 0. Nuke old schema if exists (Fixes "official_name" missing error)
drop table if exists public.state_filings;

-- 1. Create Table
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

-- 2. Enable Security
alter table public.state_filings enable row level security;
create policy "Enable read access for all users" on public.state_filings for select using (true);

-- 3. Insert Data (Vector 2 Filings)
insert into public.state_filings (slug, form_id, state_code, official_name, purpose, processing_days_manual, processing_days_electronic, penalty_per_day)
values
('mcp65-california-dmv-filing', 'MCP-65', 'CA', 'DMV 65 MCP Certificate of Insurance', 'Required for CA Motor Carrier Permit (Intrastate)', 21, 0, 500),
('pl914-california-commercial-liability', 'PL-914', 'CA', 'Commercial Vehicle Liability Insurance', 'Proof of Liability for CA # Holders', 14, 0, 300),
('form-e-texas-dmv-filing', 'Form E', 'TX', 'Uniform Motor Carrier Bodily Injury and Property Damage Liability Certificate', 'Proof of Financial Responsibility (Intrastate)', 7, 1, 250),
('sr22-texas-trucking-insurance', 'SR-22', 'TX', 'Texas Financial Responsibility Insurance Certificate', 'License Reinstatement (DUI/Serious Violation)', 5, 0, 0),
('sr22-florida-commercial-driver', 'SR-22', 'FL', 'Florida Financial Responsibility Certificate', 'CDL Reinstatement after Suspension', 10, 0, 0),
('bmc91x-federal-filing-fmsca', 'BMC-91X', 'US', 'Motor Carrier Automobile Bodily Injury and Property Damage Liability', 'Federal Operating Authority (MC Number) Active Status', 14, 0, 1200),
('bmc34-cargo-insurance-filing', 'BMC-34', 'US', 'Household Goods Motor Carrier Cargo Liability', 'Cargo Authority (Movers)', 14, 1, 800),
('form-e-ohio-puco-filing', 'Form E', 'OH', 'Uniform Motor Carrier Bodily Injury Liability (Ohio)', 'PUCO Operating Authority', 10, 1, 200),
('form-h-uniform-cargo-filing', 'Form H', 'US', 'Uniform Motor Carrier Cargo Certificate of Insurance', 'Intrastate Cargo Liability Proof', 7, 1, 400)
on conflict (slug) do nothing;
