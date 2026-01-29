-- Create Routes Table for pSEO Vector 4
CREATE TABLE IF NOT EXISTS routes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  origin_code TEXT NOT NULL, -- e.g. TX
  destination_code TEXT NOT NULL, -- e.g. CA
  origin_name TEXT NOT NULL,
  destination_name TEXT NOT NULL,
  requirements TEXT[], -- Array of strings ["BMC-91X", "MCP-65"]
  distance_tier TEXT DEFAULT 'LONG_HAUL', -- LONG_HAUL, REGIONAL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Public Read)
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public routes are viewable by everyone" ON routes FOR SELECT USING (true);
