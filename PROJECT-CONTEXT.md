# Truck Coverage Experts — Project Context

Last updated: 2026-10-02

This document is the durable operating context for the project. It should be updated whenever implementation, SEO architecture, lead capture, or deployment behavior changes. See `AGENTS.md` for the mandatory documentation rule.

## 1. Business objective

Truck Coverage Experts is an SEO-led commercial trucking insurance acquisition site. The main goal is to get in front of truckers when they have an urgent operational or compliance need, provide useful guidance or a free tool, and capture enough information for a qualified insurance quote conversation.

The strategic acquisition loop is:

```text
Urgent trucker problem
  → useful SEO answer or free tool
  → personalized readiness result/checklist
  → permission-based follow-up
  → qualified quote opportunity
  → policy outcome and feedback into prioritization
```

The site should not be treated as a collection of generic insurance landing pages. The strongest wedge is the intersection of new authority, BMC-91X/filings, broker readiness, equipment-specific coverage, and insurance documentation.

## 2. Current technical stack

- Framework: Next.js 16 App Router, React 19, TypeScript
- Deployment: Vercel
- Repository: `Emil1733/truckinginsurance`
- Local project: `C:\Users\tevat\truckinsurancesite\web`
- Primary production host: `https://www.truckcoverageexperts.com`
- Data/lead systems: Supabase and Airtable
- Analytics/search evidence: Google Search Console, with GSC API integration in the project
- Styling/UI: Tailwind CSS and project components

## 3. Lead flow and systems

### Main lead paths

1. Equipment, state, filing, and requirements pages link to quote or readiness actions.
2. Quote and niche forms submit through the application’s server/API lead flow.
3. Leads are stored in Supabase and synchronized to Airtable.
4. Airtable duplicate protection checks existing contact identity before creating another record.
5. Attribution fields such as landing page, referrer, UTM values, and GCLID should be preserved.

### Airtable destination

- Base: `Truck Coverage Experts Leads`
- Base ID: `app7QyNPZbeWQMFwQ`
- Main table ID: `tblxzpqREDu6HDfOY`
- Credentials are environment variables and must never be committed.

### Lead quality requirement

The system should record the user’s primary problem, not only their equipment type. Future readiness-tool work should distinguish at least: new authority, BMC-91X/filing, broker approval, quote request, current-policy problem, and coverage-requirement question.

## 4. Current page families

- Commercial/equipment: box truck, hot shot, car hauler/auto transport, commercial truck, and related insurance slugs.
- Requirements and authority: trucking insurance requirements, DOT/FMCSA requirements, new authority, filings, BMC-91X, MCP-65, BOC-3, and related compliance pages.
- State pages: state-specific equipment and commercial insurance routes. These require meaningful local/state differences before expansion.
- Broker and utility: broker pages, broker-check/status/lookup utilities, COI generator, safety/violation utilities, and readiness tools.
- Conversion: quote, quote success, contact, and readiness report flows.

The full route inventory is in the source tree and should be regenerated/reviewed before large architectural changes. Do not assume every indexed route is a valuable commercial SEO page.

## 5. Current SEO evidence

Latest reviewed GSC windows:

- Complete 28 days ending 2026-09-30: 41 clicks, about 7,371 impressions, CTR about 0.56%.
- Complete 90 days ending 2026-09-30: 100 clicks, about 17,707 impressions.
- Strong near-page-one opportunities include MCP-65, DMV-65/MCP, MCP 65 filing, BMC-91X, FMCSA violation codes, Form E filing, and DOT violation codes.
- Car-hauler and hot-shot pages receive impressions but generally rank too low and need stronger content, internal links, and CTR improvements.
- Newer requirements/readiness pages need separate monitoring after indexing settles.
- Broker-check pages create substantial impression noise and must be separated from commercial acquisition reporting.

Technical note: the non-www host was observed redirecting with a temporary redirect in the live environment despite the intended permanent redirect configuration. Verify and fix host consolidation at the production/domain layer before broad expansion.

## 6. SEO architecture principles

The intended hierarchy is:

```text
Carrier Readiness Center
  ├─ Start a new authority
  ├─ BMC-91X and insurance filings
  ├─ Broker approval and COI preparation
  ├─ DOT/FMCSA requirements
  ├─ Equipment-specific insurance
  └─ Quote/readiness assessment
```

Each page must have one primary intent and a clear next step. Supporting pages should link upward to the relevant hub and sideways to closely related pages. The readiness tool is a conversion layer across this architecture, not a substitute for useful content.

## 7. Implementation roadmap

### Phase 0 — Foundation and baseline (current)

- Add and maintain `AGENTS.md`.
- Maintain this project context document.
- Maintain `SEO-CONTENT-ROADMAP.md` with URL, intent, keyword, volume, status, and evidence.
- Inventory routes and classify indexed pages by commercial value.
- Establish build, lint, sitemap, GSC, lead, and deployment checks.

### Phase 1 — Measurement and technical trust

- Verify permanent www host consolidation, canonical URLs, sitemap host, and internal-link host.
- Create a route/page-family inventory with indexability and intent status.
- Separate commercial SEO reporting from broker-check and utility impressions.
- Confirm readiness-tool starts, completions, lead submissions, Airtable records, and duplicate behavior.

### Phase 2 — Carrier Readiness Center

- Create the umbrella hub and navigation for the urgent trucker problems listed above.
- Link the hub from the homepage, quote page, requirements pages, equipment hubs, and readiness tool.
- Add problem-first entry points before asking for contact details.

### Phase 3 — Readiness tool and lead intelligence

- Add primary-intent capture.
- Show a useful personalized result before optional contact capture where practical.
- Add lead type, problem, stage, score, follow-up, assignment, and outcome fields.
- Keep privacy/consent copy clear and proportionate.

### Phase 4 — Content and internal linking

- Upgrade the highest-value existing pages first: box truck, hot shot, car hauler, truck quote, requirements, and BMC-91X.
- Build only validated supporting pages from the keyword roadmap.
- Add content briefs and acceptance checks before each new page.

### Phase 5 — Distribution and feedback loop

- Create partner-ready resources for dispatchers, factoring companies, dealerships, permit services, repair shops, CDL schools, and truck finance providers.
- Measure assisted leads, not just organic clicks.
- Use qualified lead and bound-policy outcomes to prioritize future SEO work.

## 8. Definition of done for each page/change

- Intended user problem and primary keyword are documented.
- Existing route/cannibalization check completed.
- Content is materially useful and unique.
- Metadata, canonical, headings, links, and schema are appropriate.
- CTA and lead attribution are tested.
- Indexability and sitemap behavior are verified.
- Targeted lint/build/tests pass.
- Relevant roadmap/context documentation is updated.

## 9. Change log

- Connected readiness lead capture to the existing `/api/leads` workflow with server-side consent enforcement, Airtable duplicate protection, and attribution preserved in the existing `Source` and `Notes` fields (landing page, UTM values, GCLID, and referrer). No new Airtable columns are required for this handoff.

- Added intent-aware readiness links: `/trucking-insurance-readiness` now accepts `problem` query values and preselects the visitor's reason for arriving, creating a cleaner handoff from future authority, filing, broker, quote, policy, and requirements pages.

- Extended readiness intent attribution to infer the problem from the referring internal route when no query value is present. Existing filing, authority, broker, requirements, and equipment links now feed the appropriate readiness context without a risky batch rewrite of every page.

- Added an optional phone field to the readiness capture step and pass it through the existing lead API, improving quote follow-up quality without making phone collection mandatory.

- Added PostHog funnel events for readiness views, completed checklists, and successful lead submissions, including problem/equipment context and whether an optional phone was supplied.

- Hardened readiness submission error handling so network/API failures return an actionable retry message instead of an unhandled client error.

- Persisted UTM and GCLID attribution in session storage so the original acquisition source survives internal navigation before a readiness lead is submitted.

- Upgraded the trucking readiness tool's lead handoff: it now records UTM/referrer attribution and explicit contact consent, while presenting the checklist as an email-and-next-steps action.

- Removed commented-out legacy header implementations and unused header-only icon imports after the shared-header migration; each migrated route now has one active header implementation.

- Migrated dynamic `/safety-rating/[slug]` and `/violation/[slug]` detail pages to the shared `SiteHeader`, preserving their safety and violation context labels.

- Replaced remaining internal `/route` links in the homepage and footer with the canonical `/filings` directory; retained the `/route` redirect for old external links.

- Removed the stale `/broker/*` redirect to nonexistent `/broker-approval/*` routes; the implemented `/broker` directory and `/broker/[slug]` pages are now reachable at their canonical URLs.

- Batch-migrated `/carrier-readiness`, `/check-score`, `/safety-rating`, and `/broker` to the shared `SiteHeader`, preserving each tool or directory's context and quote-review path.

- Batch-migrated the remaining active sitemap pages `/about`, `/contact`, `/violations`, `/insurance/car-hauler-insurance-cost`, and `/insurance/car-hauler-insurance-requirements` to the shared `SiteHeader`; preserved each page's context and quote-review path.

- Migrated `/free-coi-generator` to the shared `SiteHeader`, preserving the free-tool context and quote-review conversion path.

- Added the shared `SiteHeader` to `/locations`, giving the state coverage directory the standard navigation, coverage-by-state context, and quote-review conversion path.

- Migrated the `/filings` state permit and filing directory to the shared `SiteHeader`, preserving its permit-directory context and quote-review conversion path.

- Migrated the `/insurance` equipment-type hub to the shared `SiteHeader`, preserving its specialized-program context and quote-review conversion path.

### 2026-10-02

- Added `AGENTS.md` with mandatory documentation, SEO quality, lead/privacy, and verification rules.
- Added this project context document.
- Defined a phased roadmap centered on Carrier Readiness, measurable lead quality, and technical trust before page-scale expansion.
- Added `ROUTE-INVENTORY.md` with route-family classifications, sitemap scope, canonical inconsistencies, and Phase 1 decisions.
- Completed a production build; documented the conflicting sitemap outputs (5,310 App Router URLs versus 419 `next-sitemap` URLs) as a Phase 1 blocker.
- Kept broker-check lookup functionality available while removing its 5,000 generated result URLs from the App Router sitemap and setting individual results to `noindex, follow`.
- Made the App Router sitemap and robots routes authoritative by removing the redundant `next-sitemap` postbuild path and stale generated public files.
- Standardized explicit absolute canonical and structured-data URLs to the `www` production host.
- Added the first Carrier Readiness Center hub at `/carrier-readiness`, linking new authority, filings, broker approval, equipment coverage, and the readiness tool.
- Fixed local Turbopack root detection so the dev server resolves this app's Tailwind dependency instead of searching the parent workspace.
- Configured the local `dev` script to use webpack because the current environment's Turbopack/PostCSS resolver continued searching the parent workspace for Tailwind despite the correct root.
- Updated the readiness tool to capture the visitor's primary problem and carry authority, cargo, and operating-radius context into the readiness lead record and Airtable Notes.
- Upgraded `/box-truck-insurance` as the first commercial priority hub with FAQ structured data, document-preparation guidance, and a prominent readiness-tool path for the box-truck insurance, coverage, cost, and quote cluster.
- Upgraded `/hot-shot` with FAQ structured data, hot-shot cost/requirements answers, and a prominent readiness-tool path for pickup-and-trailer operators.
- Upgraded the canonical auto-hauler route `/insurance/auto-hauler-car-carrier-insurance` with FAQ structured data and readiness-tool links, while preserving separate cost and requirements support pages.
- Upgraded `/trucking-insurance-requirements` with FAQ structured data and a single reusable FAQ source, strengthening the main commercial requirements hub without adding duplicate routes.
- Upgraded the dynamic BMC-91X filing route with more accurate timing language, filing-vs-policy clarification, preparation guidance, and readiness/quote paths.
- Corrected BMC-91X fee rendering so missing fixed-fee data displays as review-confirmed pricing rather than `NaN`.
- Upgraded `/new-authority-insurance` with startup FAQ schema, clearer pre-operation guidance, and a prominent readiness-tool path.
- Upgraded `/dot-insurance-requirements` with DOT/FMCSA FAQ schema, clearer insurance-versus-filing explanations, and a stronger readiness-tool path.
- Refined `/dot-insurance-lookup` copy to avoid unsupported underwriting, encryption, and guaranteed-score claims, and added a readiness-tool conversion path.
- Added the reusable `SiteHeader` component and applied the standardized shield logo, spacing, contrast, and primary CTA to the box-truck and DOT lookup routes; remaining legacy route-specific headers are queued for the next header pass.
- Migrated `/hot-shot` to the shared header while preserving its existing quote CTA destination.
- Migrated `/trucking-insurance-readiness` to `SiteHeader` while preserving the readiness tool and `/quote` CTA.
- Migrated `/trucking-insurance-requirements` to `SiteHeader` while preserving its `#review` CTA.
- Migrated `/new-authority-insurance` to `SiteHeader` while preserving its `#review` CTA and startup lead form.
- Migrated `/dot-insurance-requirements` to `SiteHeader` while preserving its `#review` CTA and lead form.
- Migrated the dynamic filing route (`/filing/[slug]`) to `SiteHeader`, preserving the filing portal status context and quote review path.
- Migrated the dynamic insurance route (`/insurance/[slug]`) to `SiteHeader`, preserving the heavy-haul division context and quote-review path.
