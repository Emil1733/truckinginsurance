-- Run this query to get a full report of your Pubic Tables
SELECT 
    t.table_name, 
    c.column_name, 
    c.data_type, 
    c.is_nullable,
    (
        SELECT CASE WHEN relrowsecurity THEN 'ENABLED' ELSE 'DISABLED' END
        FROM pg_class pc
        JOIN pg_namespace pn ON pc.relnamespace = pn.oid
        WHERE pc.relname = t.table_name AND pn.nspname = 'public'
    ) AS rls_status
FROM 
    information_schema.tables t
JOIN 
    information_schema.columns c ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public' 
    AND t.table_type = 'BASE TABLE'
ORDER BY 
    t.table_name, 
    c.ordinal_position;
