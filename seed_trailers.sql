-- 1. NUKE OLD TABLE (Safety)
drop table if exists public.trailer_risk_profiles;

-- 2. CREATE TABLE
create table public.trailer_risk_profiles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  display_name text not null,
  min_cargo_limit integer not null,
  premium_multiplier numeric not null,
  common_exclusions jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ENABLE SECURITY
alter table public.trailer_risk_profiles enable row level security;
create policy "Enable read access for all users" on public.trailer_risk_profiles for select using (true);

-- 4. INSERT DATA
insert into public.trailer_risk_profiles (slug, display_name, min_cargo_limit, premium_multiplier, common_exclusions)
values
('hazmat-tanker-insurance', 'Hazmat Tanker', 1000000, 2.5, '["Pollution Cleanup (Needs Endorsement)", "Wrongful Delivery"]'::jsonb),
('pneumatic-dry-bulk-insurance', 'Pneumatic / Dry Bulk', 100000, 1.4, '["Contamination due to residue", "Loading/Unloading accidents"]'::jsonb),
('bottom-dump-trailer-insurance', 'Bottom Dump / Belly Dump', 50000, 1.8, '["Off-road operations (needs endorsement)", "Overturn/Rollover"]'::jsonb),
('end-dump-trailer-insurance', 'End Dump', 50000, 1.9, '["Tip-over during operation", "Hydraulic failure"]'::jsonb),
('lowboy-rgn-heavy-haul-insurance', 'Lowboy / RGN (Heavy Haul)', 250000, 2.2, '["Oversize/Overweight violations", "Loading accidents"]'::jsonb),
('auto-hauler-car-carrier-insurance', 'Auto Hauler (7+ Car)', 250000, 2.0, '["Diminished Value Claims", "Theft from unattended vehicle"]'::jsonb),
('bull-hauler-livestock-insurance', 'Livestock / Bull Hauler', 100000, 2.3, '["Death due to suffocating/freezing", "Escaped animals"]'::jsonb),
('intermodal-chassis-container-insurance', 'Intermodal / UIIA Chassis', 100000, 1.3, '["UIIA Non-Compliance", "Container damage"]'::jsonb),
('reefer-breakdown-insurance', 'Reefer (Refrigerated)', 100000, 1.2, '["Reefer Breakdown (unless added)", "Driver Error (Temp Setting)"]'::jsonb);
