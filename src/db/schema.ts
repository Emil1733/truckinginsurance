import { pgTable, text, integer, uuid, jsonb, numeric } from 'drizzle-orm/pg-core';

// Vector 1: Kill Codes
export const violations = pgTable('violations', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull().unique(), // e.g., "395.8e"
  slug: text('slug').notNull().unique(), // e.g., "395-8e-false-logs"
  official_name: text('official_name').notNull(),
  layman_name: text('layman_name').notNull(),
  fine_avg: integer('fine_avg').notNull(),
  severity_tier: integer('severity_tier').notNull(), // 1-10
  rehab_steps: jsonb('rehab_steps').$type<string[]>().notNull(),
});

// Vector 2: State Filings
export const stateFilings = pgTable('state_filings', {
  id: uuid('id').defaultRandom().primaryKey(),
  state_code: text('state_code').notNull(), // "CA"
  form_id: text('form_id').notNull(), // "MCP-65"
  slug: text('slug').notNull().unique(),
  purpose: text('purpose').notNull(),
  processing_days_manual: integer('processing_days_manual'),
  processing_days_electronic: integer('processing_days_electronic'),
  penalty_per_day: integer('penalty_per_day'),
});

// Vector 3: Trailer Profiles
export const trailerRiskProfiles = pgTable('trailer_risk_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(), // "9-car-stinger"
  display_name: text('display_name').notNull(),
  min_cargo_limit: integer('min_cargo_limit').notNull(),
  common_exclusions: jsonb('common_exclusions').$type<string[]>(),
  premium_multiplier: numeric('premium_multiplier'), // 1.5
});

// Leads / Quotes
export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  driver_name: text('driver_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  violation_code: text('violation_code'),
  cdl_years: integer('cdl_years'),
  status: text('status').default('new'),
  created_at: text('created_at').default('now()'), // Simple text timestamp for now to match default
});
