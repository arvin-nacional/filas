# Homepage implementation

The homepage extends the Coming Soon palette and typography with a responsive navbar, footer, and individual Payload blocks.

## Review

- `/homepage-preview` is a development-only preview using the shared homepage content defaults. It is noindexed and returns 404 in production.
- `/` now reads the Home page through the same Payload page renderer as other pages. Published content stays visible while new layouts can be saved and previewed as drafts.
- The existing Coming Soon block still renders without the shared navbar and footer.
- The final contact link is editable and defaults to `/contact`. Contact form implementation and delivery are a separate milestone.

## Payload editing

Open Pages > Home > Content to arrange the following blocks. The Growth Hero takes the place of the generic page hero when present.

1. Growth Hero
2. Growth Introduction
3. Our Approach
4. Services Overview
5. Who We Work With
6. Approved Client Logos (optional; add only approved assets)
7. Contact Invitation

Each block has editable text and its relevant lists/links. Section anchors must be unique within the page. Default navbar links target `about`, `services`, `partners`, and `contact`; update links if those anchors change.

Header settings contain the navigation items and main action label/URL. Footer settings contain navigation, positioning text, brand promise, footer note, and an optional public contact email. Both globals restrict updates to authenticated administrators.

The logo section renders only rows marked approved with a populated logo. No client names, logos, testimonials, metrics, email addresses, or social profiles are invented in the default content.

## Preparing CMS content

`node --import=tsx/esm scripts/prepare-homepage-draft.ts --write` creates a separate page named **Homepage design**, with slug `homepage-design`, containing the six-section layout as an unpublished draft. Existing pages, including Home, are never updated. The command preserves an existing Homepage design page and verifies that a newly created draft is hidden from public queries. Without `--write`, it only checks readiness.

Use the administrator's normal Preview and Live Preview controls to review and edit that draft. Default section links stay within the separate page during authenticated draft preview. When the design is ready, apply the approved layout to Home and verify its links before publishing. Do not use the template database seed to install this homepage; that seed resets collections.

The setup command also replaces recognized Payload template navigation (or empty navigation) with FILAS section links. Customized navigation and an existing footer email are preserved. It skips Next.js revalidation outside the web request; restart development if previously cached navigation remains visible.

## Implementation notes

- Shared brand tokens live in the frontend global stylesheet; block, navbar, and footer styles are scoped CSS modules.
- Most sections render on the server. The mobile navigation is a small client component; service disclosures use native keyboard-accessible `details`/`summary` elements.
- The mobile menu closes after selecting a link and on Escape, returning focus to its trigger on Escape.
- The local preview and CMS renderer share the same blocks and defaults.
- Payload types were regenerated for the new blocks and global fields.
- ESLint now consumes Next.js's native flat configurations, matching the installed Next.js version and preserving the project's existing rule overrides.
