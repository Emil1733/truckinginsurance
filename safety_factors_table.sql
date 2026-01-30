-- Vector 6: "The Death Spiral" (Safety Ratings)
-- Targets carriers who failed a DOT audit based on specific factors.

create table safety_factors (
  slug text primary key, -- e.g., 'factor-4-vehicle-maintenance'
  factor_number integer not null, -- 1 to 6
  name text not null, -- e.g., 'Vehicle Maintenance'
  
  -- The "Pain"
  violation_examples text[], -- e.g., ["Out-of-Service Rate > 20%", "Falsified Inspection Records"]
  
  -- The "Fix" (Rehabilitation)
  recovery_steps text[], -- e.g., ["Implement Maintenance Schedule", "Upload Annual Inspections", "Request Safety Upgrade"]
  
  -- Metadata
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Read Only for Public)
alter table safety_factors enable row level security;
create policy "Public safety_factors are viewable by everyone." on safety_factors for select using (true);
