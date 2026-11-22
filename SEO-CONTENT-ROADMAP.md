# Truck Coverage Experts — SEO Content Roadmap

Last updated: 2026-11-22. Supersedes the 2026-09-05 roadmap.

## 0. Why this was rewritten

The previous version planned from coarse volume bins ("0–10", "10–100", "100–1K") and put
_requirements_ pages first, treating the commercial head terms as "broader and more competitive" that
other pages would merely support. Three months of first-party data say that allocation does not produce
lead flow:

| Test of the old plan | Result (measured 2026-11-22) |
|---|---|
| Requirements pages as the growth engine | `/trucking-insurance-requirements`: 437 impressions, **0 clicks** in 294 days |
| Requirements modifiers across equipment | **150 searches/month** total across 12 terms |
| Whole site | 231 clicks in 294 days (0.79/day) |
| The 8 equipment/product pages | **7 clicks** in 294 days |
| The two head terms the site is built around | 16,200/mo — no page exists to compete for either |

The old plan was not wrong about competition; it was wrong about where demand is. Requirements pages
sit in a market too small to carry a lead business, while the two largest terms in the category have no
page at all.

## 1. Evidence base

**Search Console.** Property `sc-domain:truckcoverageexperts.com`, window 2026-01-31 → 2026-11-20
(294 days), pulled through the API so the full page set is included (4,489 page rows) rather than the
1,000-row CSV export.

**Volumes and CPC.** Google Ads, US, pulled 2026-11-22. These are point estimates, not bins.

### 1.1 What the site actually ranks for

| Asset | Best position | Impressions (294d) | Volume of that term |
|---|---:|---:|---:|
| `/filing/mcp65-california-dmv-filing` + `/dmv65mcp` | 9.4–16.4 | 3,454 | mcp65 90/mo, dmv65mcp 90/mo |
| `/filing/bmc91x-federal-filing-fmsca` | 23.0 | 1,171 | bmc-91x 480/mo |
| `/uber-black-insurance/{state}` (17 routes) | 5.0–8.0 on 15 of 17 | 1,117 | uber black insurance 170/mo |
| `/filing/form-h-uniform-cargo-filing`, `/filing/bmc34-…`, `/filing/pl914-…` | 5.6–12.1 | 69 | no measurable volume |
| `/broker-check/{mc}` (3,594 pages) | 5.4–8.8 | 12,346 | ~18,200/mo of MC/DOT lookup |

Everything the site ranks for is a 90–480/mo term, with the single exception of the broker-check family,
which is a directory play: 3,594 pages, 114 clicks and 12,346 impressions over 294 days — 49% of the
site's clicks — working out at 95 clicks across 3,283 pages in the 92-day window, or 0.03 clicks per page
per quarter.

### 1.2 What it does not rank for

| Demand block | Volume/mo | Current state |
|---|---:|---|
| `trucking insurance` | 8,100 | homepage only, 468 words; absent from all 1,040 query rows |
| `commercial truck insurance` | 8,100 | **no page** — `/commercial-truck-insurance` returns 404 |
| `semi truck insurance` | 2,400 | **no page** |
| `trucking insurance quote` | 1,600 | `/quote` funnel page only |
| `bobtail insurance` | 1,300 | **no page** |
| `box truck insurance` | 1,300 | state route only; no national page |
| `non trucking liability insurance` | 1,000 | **no page** |
| `sr22 insurance {state}` × 38 | 19,200 | pages exist, positions 28–77 |
| `ucr registration` | 12,100 | **no page** |
| `california ca number lookup` | 590 | **no page** |

Two structural facts behind that table: **100 state URLs whose parent route 404s**
(`/commercial-truck-insurance/*` and `/hot-shot-insurance/*`) have recorded **zero impressions in 294
days**, and the state template is 345–381 words against 1,989 words and 141 internal links on the page
that ranks #1 for `trucking insurance`.

### 1.3 The SERPs the site must win (6 draws, US desktop, depth 20)

| Query | #1 | Shape of the top 10 |
|---|---|---|
| trucking insurance | joemorten.com `/products-services/states/arkansas` | **state pages** (joemorten, progressive MI/NJ/PA, insuremyrig OH/NC, truxsurance TX) |
| commercial truck insurance | reliancepartners.com `/Landers` | agency landers + city EMD + state pages |
| semi truck insurance | progressivecommercial.com | **carriers own it** (progressive, geico, sentry, northland, national indemnity) |
| bobtail insurance | bobtail.com | brand, then small agencies — **no carrier wall** |
| non trucking liability insurance | fleetguardusa.com | small agencies and one blog — **no carrier wall** |

`trucking insurance` is won by a **state page**, and five of its top ten are state pages. The site already
has that architecture; it is missing the depth. `semi truck insurance` is the one term held by carriers
and therefore the last one to attempt.

### 1.4 A measurement limit to design around

GSC attributes only **6 of 231 clicks (2.6%)** to a named query, and 41.5% of impressions. The API returns
just 1,040 query rows, so this is Google withholding low-volume query strings, not an export cap. Plan and
report on **pages**, not on query text.

## 2. The strategy this roadmap commits to

**Own the trucking-insurance buying terms with a small number of deep pages, and use the compliance layer
as acquisition rather than as the destination.**

Three reasons, each measured:

1. **Feasibility is not the constraint.** #1 for `trucking insurance` is an agency at DR 22.1; #1 for
   `box truck insurance` is DR 13.6; two sites under DR 4 sit in the top 8. What separates this site is
   page depth, internal links and a phone number — not authority.
2. **Scale is.** 22,660/mo of insurance intent exists, and 10–20% of it is 2,300–4,200 visits/month —
   the range the lead model needs. The existing page portfolio covers 1,840/mo of that demand.
3. **The compliance layer already works** (MCP-65 at position 10, 3,283 lookup pages) and speaks to the
   same person three weeks before they buy coverage. It should feed the buying pages, not replace them.

**What must be true for this to work:** the state template reaches 1,200–1,800 words with genuine
state-specific content, every state page links to a live national hub, and the money pages carry a phone
number and an inline form.

**What would falsify it:** see §5.

## 3. Work tiers

### Tier 0 — Architecture (no new prose)

**Status 2026-11-22: the `/commercial-truck-insurance` hub shipped as a full money page** (see §9). It
targets `trucking insurance` / `commercial truck insurance` / `commercial trucking insurance` /
`truck insurance`, links the equipment and state families, and closes the 404 that the 50 state children
were hanging from. The homepage title moved off the head term so the two do not compete.

- Create the missing national hubs: `/commercial-truck-insurance` (8,100/mo) and `/hot-shot-insurance`
  (480/mo) currently 404 while 50 state children are sitemap-listed. `/uber-black-insurance` likewise.
- Link every state page to its hub and every hub to the other equipment hubs.
- Sitemap: add `broker-check/*` (currently 0 entries; the family producing 64% of clicks) and the full
  `filing/*` set (9 entries for ~60 live pages).
- Repair or remove the 100 sitemap URLs whose parent returns 404.

**Acceptance:** every hub returns 200; every state page is reachable in one click from its hub; the
sitemap contains no URL whose parent 404s; `npm run build` passes; submitted sitemap shows no new errors
in GSC after 14 days.

### Tier 1 — State template depth

Rebuild the shared state template to 1,200–1,800 words with 8–13 H2s, a dated cost table, state-specific
requirements and filings, 8 FAQs with FAQPage schema, and 60–120 internal links. Match the structure of
the page that currently ranks #1 (1,989 words, 141 links) rather than the 345–381-word output that Google
is not surfacing.

Per the quality gates in `AGENTS.md`, each state page must carry information that only applies in that
state (filing authority, minimum limits, local quirks). The current template swaps the state name.

**Status 2026-11-22: the template is built and validated on three states.** Florida, Indiana and Texas
(1,357–1,391 words each) come from `src/lib/data/state-insurance-content.ts`, which holds the regulator,
the filing and who files it, the limits table, who the rule reaches, three state-specific operating
realities, FAQs and cited sources per state. Indexing is derived from that file, so a state becomes
indexable and sitemapped only when it is written. California, New York, New Jersey, Pennsylvania and
Illinois are currently noindexed and are the next five to write. A literal `${stateData.name}` bug that
rendered a stray dollar sign on all 50 pages was fixed in the same change.

**Status 2026-11-22 (later the same day): Tier 1 complete for the demand-bearing states.** All eight
written: Florida, Indiana, Texas, California, New York, New Jersey, Pennsylvania and Illinois,
1,325–1,407 rendered words each, 4 FAQs and cited sources on every one. The remaining 42 states stay
noindexed on the fallback layout and should be written only when a state shows demand in GSC or when a
producer appointment makes it worth the work. Distinctive findings now documented on the pages: Florida
has no intrastate property-authority certificate, New Jersey requires $1,500,000 on New Jersey-plated
heavy trucks regardless of the trip, Pennsylvania's intrastate authority comes from the PUC and its USDOT
display threshold is 17,001 lbs, Illinois requires an ICC certificate that federal authority does not
replace, and California ties the permit to workers compensation compliance.

**Acceptance:** three states (one high-volume, one mid, one low) pass a written checklist for
state-specific content, sentence-level duplication, metadata uniqueness, schema validity and internal
links; only then is the remaining batch generated.

### Tier 2 — Product pages, in winnability order

**Status 2026-11-22: the first two shipped.** `/non-trucking-liability-insurance` (1,514 words) and
`/bobtail-insurance` (1,354 words), both with FAQPage schema, a carrier-policy-versus-owner-policy
scenario table, and the 49 CFR 376.12(j) lease rule cited. They cross-link to each other and are linked
from the coverage section of `/commercial-truck-insurance`. The differentiator on both pages is the
honest distinction the market glosses over: non-trucking liability tests *whose business the trip is
for*, bobtail tests *whether a trailer is attached*, and most policies sold as "bobtail" are written on
a non-trucking form.

| Order | URL | Term | Volume/mo | Why this position |
|---|---|---|---:|---|
| 1 | `/insurance/non-trucking-liability-insurance` | non trucking liability insurance | 1,000 | no carrier incumbents; page 1 is small agencies |
| 2 | `/insurance/bobtail-insurance` | bobtail insurance | 1,300 | no carrier incumbents |
| 3 | `/commercial-truck-insurance` (hub + depth) | commercial truck insurance | 8,100 | agency landers and one city EMD hold it |
| 4 | `/quote` (upgraded, not a new URL) | trucking insurance quote | 1,600 | $100.93 CPC; the SERP is held by quote pages, so the site's own quote page targets it |
| 5 | `/box-truck-insurance` national page | box truck insurance | 1,300 | **done 2026-11-22** — 1,843 words, 6 FAQs; 50 state children noindexed as template swaps |
| 6 | `/semi-truck-insurance` | semi truck insurance | 2,400 | **last** — progressive/geico/sentry own this SERP |

**Acceptance per page:** distinct intent versus existing pages, 1,200+ words of original operator-focused
content, cost and requirements blocks, quote CTA, internal links in and out, and a rank reading at 8 and
12 weeks.

### Tier 3 — Compliance expansion (separate business case)

`ucr registration` (12,100/mo) and state carrier identifiers (`california ca number lookup` 590/mo,
`txdmv number lookup` 70/mo, `texas dot number lookup` 390/mo) are the largest unserved pockets the site
touches. They monetise as filing services, not as the producer lead price, and need their own decision
before pages are written.

### Tier 4 — Conversion

Every money template needs a phone number (there are **zero** `tel:` links on the live site) and an inline
form rather than a single link to `/quote` (5 fields, no phone).

## 4. Not building

- More `uber-black-insurance` or `amazon-relay-insurance` state variants — measured at 170/mo and 0/mo.
- Equipment types with no measurable demand: bottom dump, end dump, bull hauler, intermodal chassis,
  lowboy/RGN, hazmat tanker.
- More `broker-check` pages. The family already runs 3,283 pages at 0.03 clicks each.
- More requirements variants. The modifier is worth 150/mo across the whole equipment set.
- Any page whose only differentiation is a swapped state name.

## 5. Kill signals (pre-registered)

| Signal | Read |
|---|---|
| `/commercial-truck-insurance/*` still records zero impressions 8–12 weeks after hub + template rebuild | Depth is not the constraint. Stop expanding the insurance layer and put the effort into the compliance product. |
| Bobtail and non-trucking liability do not reach the top 20 within 12 weeks | The "no carrier wall" reading is wrong; re-price the whole branch. |
| `/quote` submissions stay at zero after Tier 4 with ≥100 organic clicks/month | The offer is the problem, not the traffic. |

## 6. Content rules

- Keep BMC-91X and BOC-3 as separate topics; they are not the same filing.
- Do not create pages by swapping state names. Now measured: 100 such pages have zero impressions.
- One page per intent. Resolve cannibalisation between equipment, requirements, filing and state families
  before writing.
- Check exact volume before building, not bins. Anything under ~200/mo does not justify a page.
- Requirements and coverage are subject to current rules, underwriting and state availability; say so.
- The quote form is an optional next step, not the only value on the page.

## 7. Measurement plan

- **GSC, page level:** impressions, clicks, position, monthly per URL. Do not report query-level numbers as
  if they were complete (2.6% click coverage).
- **PostHog:** readiness views, checklist completions, quote submissions.
- **Supabase / Airtable:** lead records, duplicate checks, qualification.
- **The only business number that matters:** qualified leads per month, and bound policies when the
  producer reports them.

## 8. Implementation sequence

1. Tier 0 architecture, then verify in GSC after two weeks.
2. Tier 1 template on three sample states; validate before batch generation.
3. Tier 2 pages in the order listed, one at a time, each measured at 8 weeks.
4. Tier 4 conversion on the money templates as each Tier 2 page ships.
5. Tier 3 only if the compliance business case is taken separately.

Volumes and positions in this document are measurements from 2026-11-22. Re-measure before any batch
larger than three pages.

## 9. Status

### 2026-11-22 — `/commercial-truck-insurance` shipped

- New page at `/commercial-truck-insurance`, statically prerendered, roughly 1,400 words: coverage lines,
  federal versus intrastate minimums, seven premium drivers, the pre-quote document list, equipment and
  state directories, decline reasons, filing explanations, eight FAQs with FAQPage schema, quote CTA.
- Added to the sitemap and to `PROJECT-CONTEXT.md` §4 as the national money page for the generic terms.
- Homepage title changed from "Commercial Truck Insurance & Filings" to "Truck Coverage Experts |
  High-Risk Trucking Insurance & Filings" so the two pages do not target the same head term.
- Not verified, because it cannot be yet: indexing, impressions and ranking. Review at 14 days for
  indexing and at 8 weeks for position.
- Still open in Tier 0: the `/hot-shot-insurance` parent (plan is to consolidate the 50 hot-shot state
  pages into the existing `/hot-shot` page rather than build a fourth hub), the `/uber-black-insurance`
  parent, sitemap coverage for the 87 live `filing/*` URLs against the 10 listed, and the 42
  low-demand commercial state pages.

### 2026-11-22 — Tier 0 finished

- **Filings sitemap closed.** The sitemap listed only the 10 hand-authored `FILINGS_DATA` entries while
  the live filing set is served from `state_filings` in Supabase. It now merges both: **109 filing URLs**
  in the sitemap, up from 10.
- **Hot-shot consolidated without deleting URLs.** The 50 `/hot-shot-insurance/{state}` pages are now
  `noindex, follow` (they carry no measurable demand: 320/mo + 480/mo nationally, state variants return
  nothing) and are removed from the sitemap. They stay live because `next.config.ts` rewrites that path
  to the agentic quote API for JSON clients, so a redirect there would have broken an integration; the
  single `/hot-shot` page is the indexed target.
- **42 commercial state pages noindexed.** Only Florida, California, Texas, Indiana, New York, New Jersey,
  Pennsylvania and Illinois stay indexed and sitemapped. That list lives in two places
  (`src/app/commercial-truck-insurance/[state]/page.tsx` and `src/app/sitemap.ts`) with a sync comment in
  both; flipping a state back on is one edit each. No URL was deleted or redirected.
- **`/uber-black-insurance` parent built.** 404 → 200. It carries the 17-state table of regulator,
  liability minimum and cities from `UBER_BLACK_STATES`, the policy-versus-platform distinction, the
  five FAQs with FAQPage schema, and links to every state guide. The state pages, which rank 5–8, keep
  working unchanged.
- Verified locally: `tsc --noEmit` clean, `npm run build` succeeds, sitemap renders **322 URLs** (109
  filing, 8 commercial state, 0 hot-shot state), and the built HTML shows `noindex, follow` on a
  non-listed state and on a hot-shot state while Florida and the new hub stay indexable.
