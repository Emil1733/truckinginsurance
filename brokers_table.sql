-- Vector 5: The "Broker Blacklist"
-- Stores the strict requirements for major freight brokers to generate "Recovery Pages".

create table brokers (
  slug text primary key, -- e.g., 'amazon-relay'
  name text not null, -- e.g., 'Amazon Relay'
  logo_url text, -- Path to logo (optional)
  
  -- The "Hard" Limitations
  min_auto_liability integer default 1000000, -- Standard is 1M
  min_cargo_limit integer default 100000, -- Standard is 100k
  min_trailer_interchange integer default 0, -- Some require 50k
  
  -- The "Soft" Limitations (The Pain Points)
  denial_reasons text[], -- e.g., ["Application Rejected due to 'General Liability' missing", "Rejected for 'Unsatisfactory' Safety Rating", "Name mismatch on COI"]
  
  -- The "Fix" (Our Value Prop)
  compliance_checklist text[], -- e.g., ["Add 'Amazon.com Services LLC' as Certificate Holder", "Increase Cargo to $100k", "Bind General Liability Policy"]
  
  -- Metadata
  meta_title text,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Read Only for Public)
alter table brokers enable row level security;
create policy "Public brokers are viewable by everyone." on brokers for select using (true);
