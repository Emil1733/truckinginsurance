-- Create leads table if not exists (or ensure it supports the modal)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (Critical for the modal to work)
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
CREATE POLICY "Public can insert leads" 
ON leads 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow admins (or service role) to read
DROP POLICY IF EXISTS "Service role can read leads" ON leads;
CREATE POLICY "Service role can read leads" 
ON leads 
FOR SELECT 
TO service_role 
USING (true);
