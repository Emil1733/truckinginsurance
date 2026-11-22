# Truck Coverage Experts — Project Context

Last updated: 2026-11-22

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

- Commercial/equipment: box truck, hot shot, car hauler/auto transport, commercial truck, and related insurance slugs. `/commercial-truck-insurance` is the national money page for the generic commercial-truck terms; its `/commercial-truck-insurance/{state}` children inherit it as the parent route.
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

Reviewed 2026-11-22 against the GSC API rather than a CSV export, full property history:

- 294 days ending 2026-11-20: 231 clicks, 37,993 impressions, average position 22–31, 0.79 clicks/day.
- The full page set is 4,489 URLs; the 1,000-row export under-counts the broker-check family by 3.7× (3,283 pages, 95 clicks, 48.6% of impressions over 92 days, 0.03 clicks per page).
- The 8 equipment/product pages produced 7 clicks in 294 days.
- `/commercial-truck-insurance/*` and `/hot-shot-insurance/*` (100 sitemap URLs) recorded zero impressions, and both parent routes return 404.
- Neither `trucking insurance` nor `commercial truck insurance` appears in any of the 1,040 query rows.
- Query-level attribution is incomplete by design: GSC names queries for 6 of 231 clicks (2.6%). Report on pages.

Technical note: the non-www host was observed redirecting with a temporary redirect in the live environment despite the intended permanent redirect configuration. Verify and fix host consolidation at the production/domain layer before broad expansion.

Resolved 2026-11-22: `https://truckcoverageexperts.com/*` returns 308 to `https://www.truckcoverageexperts.com/*`, and GSC daily impressions show the host turnover beginning 2026-10-31/11-01. No further host work is required.

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

- Quote CRM sync falls back to email upsert when Airtable denies record lookup but permits writes. The fallback uses submitted quote fields, including current contact details.

- Kept production lead inserts compatible with the deployed Supabase leads schema, which has no notes column. Detailed quote notes go to Airtable while Supabase retains core request fields and source.

- Main and state quote forms now capture an optional renewal date for replacement coverage and carry the session landing page and campaign parameters into lead notes. Each quote is saved as a new Supabase request. Airtable updates the latest request notes and follow-up status for a matching email and fills in a missing phone number.
- Quote sync rechecks Airtable once after a transient server or network failure. Rate-limit responses and prolonged outages leave the Supabase copy available for recovery. There is no background replay queue. Readiness contact deduplication remains separate from quote intake.

- Replaced the certificate editor with an issuer-request guide at the existing URL. The old PDF upload endpoint returns 410 without accepting or modifying documents. Existing stored documents and credential revocation require separate production review.
- Updated Next.js and its ESLint configuration to 16.4.5, refreshed the transitive protobuf.js dependency, and restricted the post-login redirect to same-origin dashboard paths.
- Added the PostHog `quote_lead_saved` event for successful main and state-page quote saves. Duplicate state leads and direct visits to the quote confirmation page do not trigger the event.
- Replaced financial-product and government-service claims in equipment and filing structured data with descriptive page markup, and removed the filing price offer from structured data.

- Corrected quote step persistence and server validation. Lead API responses now require storage for new leads, and readiness consent is checked whether or not a phone number is supplied. Airtable sync remains secondary to Supabase and sync failures are logged for follow-up.
- Removed the hardcoded COI email credential. Configure `RESEND_API_KEY` in the deployment environment and revoke the previously exposed key if active. Master COI uploads require a verified private `coi-uploads` bucket and store an internal object path. Review any existing public objects separately.
- Restricted Uber Black directory links to implemented states, removed database-only broker slugs from the sitemap, and added redirects for legacy broker URLs with direct replacements. Added the coverage, equipment, and broker directories to the sitemap and removed generated modification dates.

- Connected readiness lead capture to the existing `/api/leads` workflow with server-side consent enforcement, Airtable duplicate protection, and attribution preserved in the existing `Source` and `Notes` fields (landing page, UTM values, GCLID, and referrer). No new Airtable columns are required for this handoff.

- Added intent-aware readiness links: `/trucking-insurance-readiness` now accepts `problem` query values and preselects the visitor's reason for arriving, creating a cleaner handoff from future authority, filing, broker, quote, policy, and requirements pages.

- Extended readiness intent attribution to infer the problem from the referring internal route when no query value is present. Existing filing, authority, broker, requirements, and equipment links now feed the appropriate readiness context without a risky batch rewrite of every page.

- Added an optional phone field to the readiness capture step and pass it through the existing lead API, improving quote follow-up quality without making phone collection mandatory.

- Added PostHog funnel events for readiness views, completed checklists, and successful lead submissions, including problem/equipment context and whether an optional phone was supplied.

- Hardened readiness submission error handling so network/API failures return an actionable retry message instead of an unhandled client error.

- Persisted UTM and GCLID attribution in session storage so the original acquisition source survives internal navigation before a readiness lead is submitted.

- Added an early middleware-level 308 redirect from the non-www host to `www.truckcoverageexperts.com`, preserving path and query parameters before authentication/page handling; this reinforces canonical host consolidation for crawlers.

- Reworked the MCP-65/DMV-65 cluster so `/filing/mcp65-california-dmv-filing` owns informational requirements intent while `/dmv65mcp` owns suspension/rescue intent; added explicit cross-links and filing-readiness routing to reduce cannibalization.

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

### 2026-10-20

- Reworked `/insurance/auto-hauler-car-carrier-insurance` around the GSC opportunity cluster for `car hauler insurance`, `car hauler insurance requirements`, `car hauling insurance`, `car hauler insurance cost`, and `auto hauler insurance`.
- Replaced generic equipment language and risk-score presentation with plain-language guidance on vehicles in transit, loading/unloading, theft controls, broker requirements, open versus enclosed carriers, cost factors, and quote preparation.
- Added clearer internal paths to the car-hauler cost page, requirements page, and problem-specific readiness tool; retained the canonical route and supporting intent split.
- Strengthened contextual readiness-tool links across the car-hauler cost and requirements pages, using quote or filing intent parameters to preserve attribution and user context.

### 2026-11-04

- Added the broad-intent `/insurance/dump-trailer-insurance` guide after GSC showed `dump trailer insurance` as a high-impression query with weak ranking, while the specific belly-dump page already showed page-one visibility.
- Wrote the guide around operator intent: end dump versus bottom/belly dump work, rollover and unloading exposure, off-road and jobsite activity, cost inputs, quote preparation, and a coverage-readiness conversion path.
- Added the route to the authoritative sitemap and linked it from the equipment insurance hub; retained the existing equipment-specific pages as supporting intent pages.
- Reworked `/insurance/hazmat-tanker-insurance` for the GSC tanker and hazmat opportunity cluster, with operator-focused guidance on commodities, tanks, pollution, loading/unloading, filings, cost inputs, and quote preparation.
- Refined `/hot-shot` for hot-shot insurance requirements and quote intent, replacing generic startup framing with equipment/combination, authority, coverage, document, non-CDL, and readiness guidance.
- Strengthened internal linking from `/trucking-insurance-requirements`, `/new-authority-insurance`, and `/dot-insurance-requirements` into problem-specific readiness flows, equipment guides, and the dump/tanker pages.
- Refined `/box-truck-insurance` around box-truck insurance cost, requirements, cargo, non-CDL, 26-foot truck, and quote-preparation intent, with problem-specific readiness links.
- Added `/ifta-trucking-requirements` as a compliance resource separate from insurance, covering jurisdiction review, records, quarterly reporting, official sources, and carrier-readiness context.
- Added `/driver-qualification-file-checklist` as a compliance and lead-generation resource for FMCSA DQ-file requirements, annual reviews, owner-operators, non-CDL drivers, electronic files, and audit preparation.
- Added a browser-saved interactive DQ checklist with progress, reset, completion, and document-focused readiness CTA. It does not require contact information and emits `dq_checklist_started`, `dq_checklist_completed`, and `dq_checklist_reset` PostHog events.
- Added contextual DQ-file links from `/carrier-readiness`, `/new-authority-insurance`, and `/dot-insurance-requirements` at the point where users are preparing driver or compliance documents.

### 2026-11-22

- Rewrote `SEO-CONTENT-ROADMAP.md` against first-party measurement: GSC API over the full property history (294 days, 4,489 pages) and Google Ads point volumes pulled the same day, replacing the 2026-09-05 version's coarse bins and requirements-first allocation.
- Recorded the strategy the roadmap now commits to: own the trucking-insurance buying terms with a small number of deep pages, and use the compliance/filing layer as acquisition rather than as the destination. Reasoning: #1 for `trucking insurance` is a DR 22.1 agency state page and two sub-DR-4 sites sit in the top 8, so authority is not the barrier; page depth, internal links and the absence of a phone number are.
- Documented the measured failure of the previous allocation: `/trucking-insurance-requirements` recorded 437 impressions and 0 clicks in 294 days, requirements modifiers total 150 searches/month across 12 equipment terms, and the 8 equipment/product pages produced 7 clicks in 294 days.
- Added the missing-demand table the roadmap now works from: `commercial truck insurance` 8,100/mo with no parent page (404), `semi truck insurance` 2,400, `trucking insurance quote` 1,600 (CPC 100.93), `bobtail insurance` 1,300, `non trucking liability insurance` 1,000, `ucr registration` 12,100, plus state carrier identifiers.
- Added five work tiers with acceptance criteria (architecture, state template depth, product pages in winnability order, compliance expansion, conversion), a not-building list, and three pre-registered kill signals.
- Recorded that GSC attributes only 6 of 231 clicks to a named query, so reporting and page planning move to the page dimension.
- Updated section 5 with the 2026-11-22 GSC read and closed the non-www host note: the 308 redirect is live and GSC host turnover began 2026-10-31/11-01.
- Not changed in this entry: no routes, templates, metadata, schema or lead flow were modified. The roadmap's Tier 0-4 work is unstarted.

### 2026-11-22 (implementation)

- Created `/commercial-truck-insurance` as the national page for the generic commercial-truck insurance terms: the six coverage lines, federal versus intrastate minimums, seven rating factors, the pre-quote document list, directories into eleven equipment programs and eight states, the common decline reasons, the filing family, eight FAQs with FAQPage schema, and a quote CTA.
- Added the route to `sitemap.ts` and to §4 above. It resolves the parent 404 that the 50 `/commercial-truck-insurance/{state}` URLs were hanging from.
- Homepage title changed from `Commercial Truck Insurance & Filings` to `Truck Coverage Experts | High-Risk Trucking Insurance & Filings` so the homepage and the new page do not compete for the same head term. Homepage description, canonical and content are unchanged.
- Verified: `npx tsc --noEmit` clean and `npm run build` succeeds with `/commercial-truck-insurance` prerendered as static content. Not verified: indexing, impressions or ranking.

### 2026-11-22 (Tier 0 completion)

- Sitemap now merges `FILINGS_DATA` with the `state_filings` table in Supabase: 109 filing URLs listed instead of 10. The 87 live filing pages were indexed but never sitemapped.
- The 50 `/hot-shot-insurance/{state}` pages are `noindex, follow` and removed from the sitemap. They stay live because `next.config.ts` rewrites that path to the agentic quote API for JSON clients, so a permanent redirect would have broken that integration. `/hot-shot` is the single indexed target for the family.
- 42 `/commercial-truck-insurance/{state}` pages are `noindex, follow`; the eight states with measured demand (FL, CA, TX, IN, NY, NJ, PA, IL) stay indexed and sitemapped. No URLs deleted or redirected. The list is duplicated in the route and in `sitemap.ts` with sync comments on both.
- Added `/uber-black-insurance` as the missing parent for the 17 state guides: state-by-state regulator and liability minimum table, policy versus platform distinction, five FAQs with FAQPage schema, links to every state guide. It was a 404.
- Verified: `tsc --noEmit` clean; `npm run build` succeeds; sitemap renders 322 URLs (109 filing, 8 commercial state, 0 hot-shot state); built HTML shows `noindex, follow` on a non-listed state and a hot-shot state, and no robots meta on Florida and the new hub.

### 2026-11-22 (Tier 1, first three states)

- Found and fixed a rendering bug in the state template: `${stateData.name}` was written as JSX text, so every one of the 50 pages rendered as "Commercial Truck Insurance in **$**Alabama." The dollar sign was literal output, not a formatting artifact.
- Built `src/lib/data/state-insurance-content.ts` as the single source of truth for a state page: regulator, filing and who files it, a limits table, who the rule applies to, three state-specific operating realities, FAQs, and cited sources. Written by hand for **Florida, Indiana and Texas**, each 1,357-1,391 rendered words.
- Rewrote `/commercial-truck-insurance/[state]` to render that content when it exists and fall back to a short generic layout when it does not. Indexing is now content-driven: `STATE_CONTENT` keys are the indexed and sitemapped set, so **CA, NY, NJ, PA and IL moved to noindex** until they are written. Nothing was deleted; each returns as it is written. The family recorded zero impressions in 294 days, so no visibility is lost in the meantime.
- State-specific substance, sourced: Florida has no intrastate property-authority certificate and its weight bands sit under the federal rule; Indiana's Certificate of Public Convenience covers only household goods and passengers, so freight carriers file Form IOA-1 plus Form E; Texas requires a TxDMV number for private carriers too and issues it only after the insurer files Form E.
- Verified: `tsc --noEmit` clean, `npm run build` succeeds, sitemap now lists 317 URLs with 3 commercial state pages, FAQPage schema carries 4 questions per state, source links resolve to leg.state.fl.us, in.gov and txdmv.gov, and the three states render indexable while unwritten states render noindex.

### 2026-11-22 (Tier 1 complete)

- Wrote the five remaining demand-bearing states: California, New York, New Jersey, Pennsylvania and Illinois. All eight now render 1,325-1,407 words with 4 FAQs, a limits table, who-the-rule-reaches, three state-specific operating realities and cited sources.
- New Jersey is documented as the highest limit in the set: $1,500,000 for vehicles of 26,001 lbs or more registered or principally garaged in the state, applying to New Jersey-plated interstate trucks too, with the statute allowing primary plus umbrella to reach it.
- New York is documented as the inverse: a $100,000/$300,000 intrastate filing minimum below the federal floor, with Form E and Form H filed by a New York-authorised insurer and ACORD certificates explicitly rejected.
- Pennsylvania is documented as PUC authority rather than PennDOT, with the 17,001 lb intrastate USDOT threshold and the cancellation-without-reinstatement consequence of a lapsed filing.
- Illinois is documented as an ICC Public Carrier Certificate that federal authority does not replace, with the cargo waiver affidavit and its written-shipper-notice obligation.
- California is documented as a three-step sequence (USDOT, then CHP CA number, then DMV Motor Carrier Permit) with the MC 65 M filing and mandatory workers compensation proof.
- Sitemap now lists all 8 states (322 URLs). The remaining 42 stay noindexed on the fallback layout.
- Verified: `tsc --noEmit` clean, `npm run build` succeeds, all eight state files render 1,325-1,407 words with 4 FAQ entries, and unwritten states still render noindex.

### 2026-11-22 (Tier 2, first two product pages)

- Added `/non-trucking-liability-insurance` (1,514 words) and `/bobtail-insurance` (1,354 words), the first two Tier 2 pages and the two product SERPs in this niche where no carrier holds the top results.
- The editorial position on both is the distinction the market blurs: non-trucking liability is triggered by whose business the trip serves, bobtail by whether a trailer is attached, and many policies sold as bobtail are written on a non-trucking form. Both pages carry a scenario table showing which policy should respond per trip, and both explain the deadhead gap where neither form may answer.
- Both cite 49 CFR 376.12(j) for the lease obligation and 49 CFR Part 387 for the federal context, and both state plainly what the coverage does not do (trailer, cargo, own tractor, own injuries, primary liability).
- Added both routes to `sitemap.ts` and linked them from the coverage section of `/commercial-truck-insurance`, so the hub now routes to the two off-duty coverages instead of only describing them.
- Verified: `tsc --noEmit` clean, `npm run build` succeeds, 5 FAQs with FAQPage schema on each page, sitemap at 324 URLs with both routes listed.

### 2026-11-22 (identity: typographic wordmark)

- Replaced the generated badge mark with a typographic lockup. The site already loads Oswald (condensed display) and JetBrains Mono, so the wordmark uses those with no new font payload: a 3px safety-orange rule, "TRUCK COVERAGE" in tracked mono above, "EXPERTS" in heavy Oswald below.
- Reason for the change: generated raster marks read as app icons and carried small geometry flaws (uneven bar spacing, an interlocked T and C that broke into fragments). Type is exact at every size, needs no raster assets, and matches the industrial-noir system the rest of the site already uses.
- Favicon is now a typographic monogram: white "TC" on safety orange, rendered to `app/icon.png` (512), `app/apple-icon.png` (180). Icon payload dropped from 260 KB to 4.8 KB.
- Removed the generated marks from `public/` so nothing unused is served. The five concepts kept for reference live in `brand/source/` at the repo root, outside the deployed bundle.
- Verified: `tsc --noEmit` clean, `npm run build` clean, homepage and interior pages render the wordmark with no image requests, and the header CTA remains safety orange.

### 2026-11-22 (quote page targets its term)

- `/quote` was indexable and canonical but had no content at all, so it could not rank for anything. It now carries an H1, an intro band above the form, and roughly 850 words below it: what a quote is and is not, why the form asks about violations first, six premium drivers, realistic timings including filing clocks, the document checklist, and four FAQs with FAQPage schema.
- Metadata retargeted from `Commercial Truck Insurance Quote Review` to `Trucking Insurance Quote: Costs and Requirements`, matching the 1,600/mo term at $100.93 CPC. Open Graph copy updated to match.
- Chose to upgrade `/quote` rather than create `/trucking-insurance-quote`: the SERP is held by quote pages (`arizonatruckinginsurance.com/get-quote`, `dallastruckinginsurance.com/get-quote`), and a second URL would have competed with the site's own conversion page.
- Added `/quote` to the sitemap (325 URLs). The multi-step form, its server action, attribution handling and PostHog events are unchanged.
- Verified: `tsc --noEmit` clean, `npm run build` clean, one `<form>` still renders, one H1, 4 FAQ schema questions, canonical intact.

### 2026-11-22 (box truck page rebuilt)

- Rebuilt `/box-truck-insurance`, the national target for `box truck insurance` (1,300/mo, $77.74 CPC). The previous version was 928 words of hedged copy and rendered a mojibake em dash in the hero (`contractsâ€”not`).
- New page is 1,843 rendered words: the three coverages a box truck actually needs, the three weight classes and what each changes (USDOT at 10,001 lbs, CDL at 26,001), six premium drivers, the four uses that get mispriced (final mile, household goods, contractor private carriage, linehaul in a straight truck), five claim-time mistakes, the document checklist, and six FAQs with FAQPage schema.
- Unpriced claims replaced with sourced facts: `49 CFR 387.9` for the $750,000 floor, FMCSA for the USDOT threshold, `49 CFR 383` for the CDL line.
- Noindexed the 50 `/box-truck-insurance/{state}` pages and removed them from the sitemap. They are template swaps: across 294 days the family recorded one state with impressions (Wyoming, 295 impressions, 0 clicks) and nothing else. They stay live for existing links.
- Sitemap now 275 URLs (was 325); the national page remains listed.
- Verified: `tsc --noEmit` clean, `npm run build` clean, 6 FAQ schema questions, zero mojibake, state pages render `noindex, follow`.

### 2026-11-22 (semi truck page — Tier 2 complete)

- Added `/semi-truck-insurance` (1,807 words), the last Tier 2 page and the only one in a SERP held by carriers (Progressive, Geico, Sentry occupy 1-3). Two content pages rank at 4 and 6 and city EMDs at 13-14, so the realistic target is 5-10 rather than 1.
- Content: six coverages a tractor carries (including trailer interchange and occupational accident), the federal floor with the four other parties that set a number (broker contract, lender, lessee carrier, state), six underwriting inputs, six hard-to-place profiles, and five claim-time failures — all sourced to 49 CFR 387.9, 376.12 and 383.
- Linked from the equipment directory on `/commercial-truck-insurance` alongside box truck, and added to the sitemap (276 URLs).
- Tier 2 is now complete: non-trucking liability, bobtail, commercial hub, quote page, box truck, semi.
- Verified: `tsc --noEmit` clean, `npm run build` clean, 6 FAQ schema questions, hub renders the new link.
