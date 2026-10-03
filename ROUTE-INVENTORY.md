# Route and Indexation Inventory

Last reviewed: 2026-10-02

This inventory records the route families currently implemented in `src/app`. It is the working classification for SEO, internal linking, and indexation decisions. A route being present in the source tree does not automatically mean it should be indexable or included in the XML sitemap.

## Classification key

- **Commercial core** — directly serves a trucker’s insurance or quote intent.
- **Commercial support** — answers a requirements, filing, broker, or operational problem that can lead to a quote.
- **Utility** — useful product/tool experience; indexability depends on whether the page has durable standalone search value.
- **Data/programmatic** — generated from a dataset; must pass uniqueness and usefulness checks before being treated as SEO content.
- **Account/internal** — should not be publicly indexed.
- **Legal/trust** — necessary trust pages, but not acquisition priorities.
- **Review** — requires an explicit indexation, canonical, or content-quality decision.

## Current route families

| Family | Routes/patterns | Classification | Current decision | Next action |
|---|---|---|---|---|
| Homepage | `/` | Commercial core | Index | Make the readiness/quote architecture obvious |
| Quote | `/quote`, `/quote/success` | Commercial core / utility | Quote indexable; success should not compete | Verify success indexation and conversion tracking |
| Equipment hubs | `/box-truck-insurance`, `/hot-shot`, `/insurance`, `/insurance/[slug]` | Commercial core | Index where intent is distinct | Audit titles, intent, content depth, and internal links |
| Equipment state pages | `/box-truck-insurance/[state]`, `/hot-shot-insurance/[state]`, `/commercial-truck-insurance/[state]` | Commercial core/support | Index only with real state value | Validate uniqueness and state-specific requirements |
| Amazon Relay | `/amazon-relay-insurance`, `/amazon-relay-insurance/[state]` | Commercial support/core | Index if content is accurate and useful | Review programmatic uniqueness and broker/insurance intent |
| Uber Black | `/uber-black-insurance/[state]` | Commercial support/review | Review | Confirm audience fit and quality before broad indexing |
| Requirements | `/trucking-insurance-requirements`, `/dot-insurance-requirements` | Commercial support | Index | Make these primary architecture hubs |
| Authority/startup | `/new-authority-insurance` and future authority routes | Commercial support | Index | Connect to readiness tool and filing pages |
| Filing hub | `/filings`, `/filing/[slug]`, `/dmv65mcp` | Commercial support/data | Index valuable filing topics | Separate BMC-91X, MCP-65, BOC-3, Form E, and filing intent |
| Violations | `/violations`, `/violation/[slug]` | Support/data | Review | Keep useful explanatory pages; check thin entries and commercial links |
| Broker approval | `/broker`, `/broker/[slug]` | Support/data | Review | Validate unique broker requirements and avoid templated filler |
| Broker checks | `/broker-check`, `/broker-check/[mc]` | Utility/data | Tool remains available; individual results are `noindex, follow` and excluded from sitemap | Keep the utility useful; promote only genuinely valuable broker-approval content |
| Safety ratings | `/safety-rating`, `/safety-rating/[slug]` | Utility/data | Review | Check public value, freshness, thinness, and sitemap inclusion |
| Status lookup | `/status/[mc_number]` | Utility/data | Review | Avoid indexing transient results unless useful and stable |
| DOT lookup | `/dot-insurance-lookup` | Utility | Review | Keep useful UX; establish indexation intent explicitly |
| COI generator | `/free-coi-generator` | Utility/commercial support | Index if result is useful | Improve trust, explanation, and quote handoff |
| Readiness tool | `/trucking-insurance-readiness` | Commercial support/utility | Index | Add problem intent, result value, and lead attribution |
| Carrier Readiness Center | `/carrier-readiness` | Commercial support/core | Index | Umbrella hub for authority, filings, broker approval, equipment, and readiness paths |
| Partner/service pages | `/dispatchers`, `/uiia-certification`, `/geico-truck-insurance-comparison` | Support/review | Review individually | Keep only where audience and content are genuinely relevant |
| Resources | `/resources/reinstatement-guide` | Commercial support | Index if substantive | Expand resource-to-quote path and keep noindex decision documented |
| Company/trust | `/about`, `/contact`, `/locations` | Legal/trust/support | Index | Improve trust signals, licensing clarity, and contact path |
| Legal | `/privacy`, `/terms` | Legal/trust | Index or leave default | Verify metadata and no accidental conversion claims |
| Authentication/internal | `/login`, `/auth/*`, `/dashboard/*` | Account/internal | Noindex/block from sitemap | Verify robots and accidental internal linking |

## Sitemap findings

`src/app/sitemap.ts` currently publishes static routes, violations, filings, equipment datasets, broker approval/check datasets, database-backed broker/safety/status routes, and multiple 50-state families. This is a substantial indexation surface. Before creating more pages, we must measure URLs emitted by each family and compare them with impressions, clicks, meaningful content, and leads.

### Build baseline recorded 2026-10-02

The production build completed successfully, but it exposed two sitemap outputs:

- App Router `sitemap.xml` body: **5,310 URLs**.
- Postbuild `next-sitemap` `sitemap-0.xml`: **419 URLs**.

The 5,310 App Router URLs break down approximately as follows:

| Family | URLs |
|---|---:|
| Broker checks | 0 (removed from sitemap) |
| Amazon Relay state pages | 51 |
| Box truck state pages | 51 |
| Commercial truck state pages | 50 |
| Hot shot state pages | 50 |
| Violations | 39 |
| Uber Black state pages | 17 |
| Insurance dataset pages | 11 |
| Broker approval pages | 10 |
| Filing pages | 9 |
| Safety rating pages | 6 |
| Static routes | 17 |

The 419-vs-5,310 mismatch was caused by two sitemap-generation paths. The project now uses the App Router sitemap as the single source of truth; the redundant `next-sitemap` postbuild path and stale public sitemap/robots artifacts were removed. The broker-check family now has an explicit decision: the tool remains accessible, individual result pages are `noindex, follow`, and the 5,000 generated results are excluded from the App Router sitemap.

## Canonical/host findings

The project uses `https://www.truckcoverageexperts.com` as `metadataBase`, but route metadata currently mixes absolute `www` URLs, absolute non-`www` URLs, and relative canonical paths.

Required standard: production canonicals, sitemap URLs, structured-data URLs, internal absolute URLs, and permanent host redirects must consistently use `https://www.truckcoverageexperts.com`.

## Phase 1 decisions before expansion

1. Confirm the canonical production host and permanent redirect behavior.
2. Verify the single App Router sitemap and robots endpoints in local and production environments.
3. Compare each family against GSC impressions, clicks, average position, and lead events.
4. Identify remaining thin/duplicate programmatic families and decide: improve, consolidate, noindex, or remove from sitemap.
5. Verify account/internal routes cannot be indexed.
6. Standardize canonical metadata on commercial pages.
7. Document every decision in this file and `PROJECT-CONTEXT.md`.

## Current priority order

1. Protect the commercial core: homepage, quote, equipment hubs, requirements, filings, and readiness.
2. Fix host/canonical/sitemap consistency.
3. Audit 50-state templates before adding more state pages.
4. Separate broker-check, status, safety, and violation data from commercial SEO reporting.
5. Only then expand the Carrier Readiness Center and new content clusters.

## Change log

- Hardened readiness lead handoff: readiness submissions now require consent server-side, are checked for Airtable duplicates, and retain acquisition attribution in the existing Airtable `Source`/`Notes` fields.

- Added query-driven intent preselection to the readiness tool so internal acquisition links can carry the visitor's problem into the first question without creating separate duplicate tools or routes.

- Added referrer-based intent inference to the readiness tool; existing internal links from filing, authority, broker, requirements, and equipment pages now receive contextual preselection automatically.

- Added optional phone capture to the readiness result form; email remains required and phone is presented only as an optional quote-help channel.

- Added readiness funnel telemetry through the existing PostHog setup: `readiness_tool_viewed`, `readiness_tool_completed`, and `readiness_lead_submitted`.

- Added explicit retry messaging for readiness API failures and network errors.

- Preserved UTM/GCLID values across the visitor session so multi-page SEO journeys retain their original acquisition attribution.

- Upgraded `/trucking-insurance-readiness` lead capture with attribution fields and explicit contact consent; preserved the existing readiness result and quote-review path.

- Removed commented-out legacy header implementations so migrated routes now have one active header implementation.

- Migrated `/safety-rating/[slug]` and `/violation/[slug]` to `SiteHeader`; preserved breadcrumbs, detail content, and quote-review conversion paths.

- Replaced internal `/route` links with `/filings`; kept the legacy redirect only for backward compatibility with old URLs.

- Removed the stale `/broker/*` redirect to `/broker-approval/*`, restoring the canonical broker directory and detail routes used by the sitemap and internal links.

- Batch-migrated `/carrier-readiness`, `/check-score`, `/safety-rating`, and `/broker` to `SiteHeader`; kept the utility and broker directory workflows intact.

- Batch-migrated `/about`, `/contact`, `/violations`, and both car-hauler support pages to `SiteHeader`; preserved their page-specific contexts and `/quote` conversion paths.

- Migrated `/free-coi-generator` to `SiteHeader`, preserving the free COI tool context and `/quote` conversion path.

- Added `SiteHeader` to `/locations` so the state coverage directory uses the standard navigation and `/quote` conversion path.

- Migrated `/filings` to `SiteHeader`, preserving the permit-directory label and `/quote` conversion path.

- Migrated `/insurance` to `SiteHeader`, preserving the specialized-program label and `/quote` conversion path.

### 2026-10-02

- Created the first route and indexation inventory from the implemented App Router tree and sitemap generator.
- Recorded the mixed canonical-host issue and large programmatic sitemap surface for Phase 1 remediation.
- Upgraded `/box-truck-insurance` with FAQ schema, stronger quote-preparation guidance, and an internal readiness-tool link; retained the existing hub as the canonical target for the box-truck keyword cluster.
- Upgraded `/hot-shot` with FAQ schema, hot-shot insurance cost/requirements guidance, and an internal readiness-tool link; retained the existing hub as the canonical target for the hot-shot cluster.
- Upgraded `/insurance/auto-hauler-car-carrier-insurance` with FAQ schema and readiness-tool paths; retained `/insurance/car-hauler-insurance-cost` and `/insurance/car-hauler-insurance-requirements` as supporting intent pages.
- Upgraded `/trucking-insurance-requirements` with FAQ schema and centralized FAQ content; retained it as the main requirements hub.
- Upgraded `/filing/bmc91x-federal-filing-fmsca` with clearer filing scope, non-guaranteed timing language, preparation guidance, and readiness links.
- Upgraded `/new-authority-insurance` with startup FAQ schema, pre-operation guidance, and a prominent readiness-tool path.
- Upgraded `/dot-insurance-requirements` with DOT/FMCSA FAQ schema and readiness-tool linking; retained `/dot-insurance-lookup` as the lookup utility rather than duplicating its function.
- Refined `/dot-insurance-lookup` trust copy and added a readiness-tool conversion path while keeping it as the lookup utility.
- Ran a successful production build and recorded the conflicting 5,310-URL App Router sitemap versus 419-URL `next-sitemap` output.
- Removed broker-check results from the App Router sitemap and set individual broker-check result pages to `noindex, follow` while keeping the lookup tool accessible.
- Removed the redundant `next-sitemap` build path and stale public sitemap/robots files; App Router sitemap and robots are now authoritative.
- Standardized explicit absolute app URLs and structured-data URLs to the `www` production host; relative canonicals continue to resolve through `metadataBase`.
- Added the `/carrier-readiness` hub as the primary problem-first entry point into the commercial support and readiness architecture.
- Fixed the Next.js Turbopack root configuration after localhost served the route but failed to resolve Tailwind from the parent workspace.
- Configured local development to use webpack after the environment's Turbopack/PostCSS resolver continued producing parent-workspace Tailwind errors.
- Updated the readiness tool's lead payload to preserve primary problem, authority, cargo, and radius context for follow-up.
- Began header consistency work with `src/components/SiteHeader.tsx`, applying one accessible logo treatment and CTA pattern to `/box-truck-insurance` and `/dot-insurance-lookup`; other legacy headers remain to be migrated.
- Migrated `/hot-shot` to `SiteHeader` and retained its existing `/quote` conversion path.
- Migrated `/trucking-insurance-readiness` to `SiteHeader` and retained its readiness tool and `/quote` conversion path.
- Migrated `/trucking-insurance-requirements` to `SiteHeader` and retained its `#review` conversion path.
- Migrated `/new-authority-insurance` to `SiteHeader` and retained its startup lead form and `#review` path.
- Migrated `/dot-insurance-requirements` to `SiteHeader` and retained its lead form and `#review` path.
- Migrated `/filing/[slug]` to `SiteHeader`, preserving the filing portal status context and `/quote` conversion path.
- Migrated `/insurance/[slug]` to `SiteHeader`, preserving the heavy-haul division context and `/quote` conversion path.
