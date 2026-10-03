# Agent Working Rules — Truck Coverage Experts

## Project purpose

Truck Coverage Experts is an SEO-led commercial trucking insurance site. Its primary business outcome is to reach active and prospective truckers, help them solve an urgent compliance, authority, broker, equipment, or coverage problem, and convert qualified interest into a quote opportunity. SEO traffic is valuable only when it produces useful interactions and qualified leads.

## Required documentation rule

Whenever an agent changes code, page content, SEO architecture, metadata, schema, lead capture, analytics, integrations, environment configuration, or deployment behavior:

1. Check `PROJECT-CONTEXT.md` and the relevant roadmap before making the change.
2. Update the relevant documentation in the same change when the change affects how the site works, what pages exist, what keywords they target, how leads flow, or how the project is operated.
3. Record the change in `PROJECT-CONTEXT.md` under the change log, or in a more specific document when appropriate.
4. Update `SEO-CONTENT-ROADMAP.md` when a URL, page purpose, keyword target, internal-link relationship, or SEO priority changes.
5. Never claim a page, integration, test, deployment, or GSC result is complete unless it was actually verified.

Documentation is part of implementation, not an optional follow-up.

## Change discipline

- Work in small, reviewable phases. Do not generate large page batches before validating the template, uniqueness, indexing, and lead tracking on a small sample.
- Preserve existing user changes. Inspect the worktree before editing and avoid destructive git commands.
- Use `apply_patch` for hand-authored file changes.
- Keep secrets out of source control. Document required environment variable names, never their values.
- Run the narrowest useful validation after each phase, then run a production build before deployment-related changes are considered ready.
- Do not push to GitHub unless the user explicitly asks to push.

## SEO quality gates

- Every indexable page needs a distinct search intent, useful original content, clear title/meta description, canonical URL, appropriate structured data, and meaningful internal links.
- State pages must contain genuinely state-specific information; do not publish pages that only swap a state name.
- Avoid keyword cannibalization between equipment, requirements, filing, broker, and state page families.
- Do not create pages solely to inflate the index. Thin, duplicate, obsolete, or non-commercial utility pages must be improved, consolidated, redirected, or intentionally excluded from indexing.
- Treat GSC impressions as evidence of visibility, not proof of commercial value. Track tool starts, completions, qualified leads, quote requests, and bound-policy outcomes where available.
- Use current technical SEO terminology and best practices: INP rather than FID, permanent canonical host redirects, valid sitemap URLs, and no deprecated HowTo schema.

## Lead and privacy principles

- Capture only information needed for the user’s stated next step.
- Explain clearly why contact information is requested and avoid copy that implies indiscriminate lead resale.
- Preserve attribution and the user’s originating problem so the team can follow up intelligently.
- Keep duplicate protection and Airtable/Supabase synchronization behavior documented when changed.

## Standard workflow

1. Inspect the existing implementation, documentation, routes, and worktree status.
2. Define the smallest useful change and its acceptance criteria.
3. Implement the change.
4. Update documentation in the same change.
5. Run targeted checks and a build when appropriate.
6. Report exactly what changed, what was verified, and what remains.
