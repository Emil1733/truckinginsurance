-- MIGRATION: ROUTES APP UPGRADE
-- Adds fields for the AI Content Factory

DO $$ 
BEGIN 
    -- 1. Status Tracking (DRAFT, PUBLISHED, ERROR)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'status') THEN 
        ALTER TABLE routes ADD COLUMN status TEXT DEFAULT 'DRAFT'; 
    END IF;

    -- 2. The Content Payload
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'content_markdown') THEN 
        ALTER TABLE routes ADD COLUMN content_markdown TEXT; 
    END IF;

    -- 3. SEO Meta Title (Pre-generated)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'meta_title') THEN 
        ALTER TABLE routes ADD COLUMN meta_title TEXT; 
    END IF;

    -- 4. SEO Meta Description
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'meta_description') THEN 
        ALTER TABLE routes ADD COLUMN meta_description TEXT; 
    END IF;

    -- 5. AI Prompt Data (Optional - to store retrieved facts)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'ai_context') THEN 
        ALTER TABLE routes ADD COLUMN ai_context JSONB DEFAULT '{}'::jsonb; 
    END IF;
END $$;
