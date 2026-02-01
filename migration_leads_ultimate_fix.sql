-- 1. Relax Schema Constraints (Make everything optional except email)
alter table public.leads alter column phone drop not null;
alter table public.leads alter column first_name drop not null;
alter table public.leads alter column last_name drop not null;
alter table public.leads alter column company_name drop not null;
alter table public.leads alter column message drop not null;

-- 2. Ensure Defaults exist
alter table public.leads alter column email set not null;
alter table public.leads alter column source set default 'website';
alter table public.leads alter column created_at set default now();
alter table public.leads alter column metadata set default '{}'::jsonb;

-- 3. Re-Apply Permissions (Just to be absolutely sure)
drop policy if exists "Enable insert for all users" on public.leads;
create policy "Enable insert for all users"
on public.leads
for insert
to public
with check (true);

grant insert on public.leads to anon;
grant insert on public.leads to authenticated;
grant insert on public.leads to service_role;
