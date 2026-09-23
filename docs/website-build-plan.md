# FILAS website build plan

Planning draft · September 23, 2026

Build a five-page corporate website around the visual language of the existing Coming Soon block and the proposal's central message: FILAS helps brands build on what they have already achieved and grow with practical, accountable support.

This document records a proposed implementation plan. The user's confirmed design preference is to build on the Coming Soon block. Page layouts, service groupings, draft copy, and CMS additions below are recommendations for the next design milestone.

## Basis and current state

- Source: `C:/Users/Arvin/Downloads/FILAS corporate website proposal.pdf`, prepared September 18, 2026. Positioning is on pages 2–3; page scope on 4–5; CMS and technical deliverables on 6; delivery schedule on 7; scope exclusions on 9.
- The repository declares Next.js 16.3.3, React 19.2.6, and Payload 3.89.0. Continue with this existing project.
- Pages already support blocks, drafts, preview, publishing, SEO fields, and revalidation hooks.
- MongoDB and S3 media storage are configured in source. This review did not verify production connectivity or deployment readiness.
- Header and Footer globals, media management, redirects, and the form-builder plugin already exist.
- The public-facing header, footer, forms, and generic blocks still use template styling. They need to adopt the FILAS design.
- No email transport is configured in the inspected Payload config. Form delivery and anti-spam behavior need implementation and verification.
- A page containing only the Coming Soon block intentionally bypasses the ordinary site header, footer, and hero. Preserve that behavior while preparing the new homepage in draft.
- The repository includes the FILAS logo and social-share artwork. Approved client logos, service copy, team details, and operational photography have not yet been confirmed.
- The design review used component source and CSS. An attempted local preview stopped with a filesystem lock access error; runtime appearance has not been verified in this planning pass.

## Design direction

The website should feel calm, confident, spacious, and human. Carry the current palette and typography into a consistent site-wide system.

| Element | Existing foundation | Extension for the full site |
| --- | --- | --- |
| Main surface | Warm ivory `#faf9f6` | Use across page backgrounds and the primary header/footer treatment. |
| Main text | Charcoal `#1c1c1b` | Use for large headlines, navigation, and body copy. |
| Accent | Rust `#b85236` | Use sparingly for the signature period, active details, and calls to action; verify contrast for each use. |
| Secondary copy | Warm gray `#69655f` | Use for descriptions and supporting information. |
| Dividers | Fine rules `#dfddd6` | Organize sections, navigation, and service rows. |
| Typography | Geist Sans and Geist Mono | Keep Sans for reading and expressive headlines; Mono for short labels and numbering. |
| Layout | Generous margins and a 1440px maximum frame | Establish shared containers and spacing; use narrower columns for long text. |
| Brand signature | Large type, tight headline spacing, colored period | Retain the character with deliberate line breaks and comfortable mobile sizing. |

Use a centered, spacious homepage opening to preserve the Coming Soon composition. Move the logo into a compact navigation header so the growth message becomes the main focus. Below the hero, use left-aligned sections, split text/image compositions, and numbered service rows for easier reading.

The existing small monospace labels suit a holding page. Increase sizes where they become navigation or meaningful content. Body text should be comfortably readable on mobile. Keep interactions restrained, keyboard accessible, and compatible with reduced-motion preferences.

Use real FILAS people, fulfillment operations, products, and activation photography when supplied. The opening design can work with typography alone. Treat imagery as evidence of the business, with descriptive alternative text.

## Recommended sitemap

Use five separate main pages. The homepage introduces each topic; dedicated pages provide depth without crowding the opening experience.

| Page | Route | Purpose and principal content | Main next step |
| --- | --- | --- | --- |
| Home | `/` | Growth promise, common challenges, FILAS approach, capabilities, partner stages, approved proof, invitation to talk. | Start a conversation. |
| About FILAS | `/about` | Company story, meaning of FILAS, mission and vision, principles, approved leadership/team information. | Discuss a partnership. |
| Services & Capabilities | `/services` | Four groups covering the full approved service list, with outcomes and practical examples. | Inquire about a service. |
| Who We Work With | `/who-we-work-with` | Start-ups, scale-ups, enterprise brands, supported industries, approved client names/logos. Give scale-ups the strongest narrative emphasis. | Describe the brand's needs. |
| Contact | `/contact` | Welcoming introduction, business inquiry form, approved contact information and social links. | Submit an inquiry. |

Navigation: FILAS logo linking home, About, Services, Who We Work With, and a prominent “Let's talk” link to Contact. On mobile, use a simple accessible menu.

Include client-supplied privacy information through a footer link and beside the form. A short utility page can use the existing Pages system; its wording and inclusion should be settled with the final content inventory.

The initial launch focuses on the proposal's corporate pages. Blog publishing, search, individual service landing pages, and case-study pages are later additions if requested. Review inherited template routes and seed content before launch so they are not accidentally presented as FILAS content.

## Homepage outline

| Order | Section | Content and visual treatment |
| --- | --- | --- |
| 1 | Navigation | Compact logo, quiet navigation, one clear contact action, fine bottom rule. |
| 2 | Hero | Centered statement, brief explanation, primary inquiry link, secondary Services link; generous breathing room and the rust period. |
| 3 | Growth challenge | A short introduction to the difficulty of coordinating channels, stock, fulfillment, content, and customer experience as a brand grows. |
| 4 | The FILAS approach | Four numbered steps: Listen, Optimize, Execute, Stay accountable. Explain what working together feels like. |
| 5 | Capabilities | Four concise service groups, each linking to its corresponding Services section. |
| 6 | Who we work with | Three concise stage summaries. Give scale-ups emphasis while welcoming start-ups and enterprise teams. |
| 7 | Experience and trust | Approved brand logos and/or authentic operational photography. Omit unapproved proof rather than filling it with invented claims. |
| 8 | Closing invitation | A direct, reassuring invitation to tell FILAS about the business. Keep the full form on Contact. |
| 9 | Footer | Brand promise, essential navigation, approved contact/social details, privacy link, copyright. |

Draft hero copy for the first design:

> **You have built something worth growing.**
>
> FILAS helps you take it further. We bring strategy, marketplace operations, creative, fulfillment, and technology together to support your next stage of growth.
>
> **Let's talk about your brand** · Explore our capabilities

Keep “First to Execute. Last to See Things Through.” as the enduring brand promise in the About story and footer. Lead the homepage with the visitor's growth needs.

Draft closing invitation: “Tell us where you are. Let's work out what comes next.” Copy remains subject to content review; this plan is not a full corporate copywriting deliverable.

## Organizing the service ecosystem

The following grouping is a proposed navigation and content aid. Confirm labels and descriptions against the final approved service list.

| Group | Proposal capabilities covered |
| --- | --- |
| Commerce & channels | Shopee, Lazada, TikTok Shop, brand websites/D2C, e-commerce store management, retail store management. |
| Fulfillment & systems | Storage, fulfillment, logistics, Warehouse Management System and Order Management System capabilities. |
| Content & activation | Social media management, creative concepts and execution, online and on-ground activations, affiliate management, live selling. |
| Business support | Importer on Record, Seller on Record, and other specifically approved value-added services. |

Give each group a plain-language outcome, short introduction, and scannable capability list. Describe WMS/OMS and marketplace services as FILAS capabilities; the website project does not implement those operational systems or integrations.

Use anchor links within `/services` for the first release. The CMS can reuse service summaries on Home without requiring additional public detail pages.

## Content management plan

Give the FILAS team control over content using structured, branded sections. Keep layout proportions, type sizes, and color choices in the design system.

| Area | Implementation direction | Editable content |
| --- | --- | --- |
| Pages | Extend the existing collection and draft/preview workflow. | Headings, body copy, selected section order, imagery, calls to action, SEO titles/descriptions/share images. |
| Services | Add a reusable Services collection. | Name, group, summary, detail, capabilities, display order, selected media, publication status. |
| Clients | Add a Clients collection. | Approved display name, logo, industry/category, display order, featured flag, publication/approval state. |
| Team | Add only when approved team content is included. | Name, role, short biography, photo, order, publication state. |
| Media | Reuse the existing collection/storage setup. | Images, alternative text, crops/focal points, approved downloads if needed. |
| Header and Footer | Extend the existing globals. | Navigation, contact action, brand promise, footer links. |
| Site settings | Add a small global. | Public email/phone, address, social links, default metadata and selected shared text. |
| Inquiry form | Adapt the existing form-builder plugin and submission collection. | Form introduction, service choices, confirmation text; controlled administrative routing. |

Proposed reusable sections: growth hero, text/image split, numbered approach steps, service overview, audience stages, client logos, optional team listing, and closing contact invitation. Adapt the existing Content, Media, Form, and Call to Action blocks where practical.

Separate the public contact email from administrative inquiry routing. Restrict the routing recipient to server/admin use and verify it is not exposed through public APIs. Inquiry submissions must be readable only by authorized administrators. Public content queries must enforce publication and display approval rules.

## Inquiry experience

Use a single-page form with visible labels, clear required fields, helpful validation, and a reassuring success message. On desktop, place contact details beside the form; stack on mobile.

| Field | Proposed requirement |
| --- | --- |
| Company/brand name | Required. |
| Contact person | Required. |
| Email | Required. |
| Contact number | Present; optional by default unless FILAS needs it to qualify inquiries. |
| Website or marketplace links | Optional, allowing multiple links without adding a complex interface. |
| Services of interest | Allow multiple choices and “I'm not sure yet.” |
| Short description of requirements | Required, with a plain-language prompt. |

Implementation should include server-side validation, basic anti-spam protection such as a honeypot and rate limiting, protected submission storage, configured email delivery, duplicate-submit prevention, and accessible success/error states. Save accepted inquiries before attempting notification, and make notification failures visible to administrators so leads are recoverable.

Do not promise a response time until FILAS confirms it. Confirm the designated recipient, sender identity, delivery service, and approved privacy wording before the launch delivery test. Service links may preselect a relevant service, while allowing visitors to change it.

## Build milestones

Use the proposal's three-to-four-week window as a planning baseline, subject to content, access, and consolidated feedback availability. Prefer four weeks for scheduling. The proposal's commercial start conditions remain separate from this planning exercise.

| Milestone | Indicative period | Concrete deliverable | Completion check |
| --- | --- | --- | --- |
| 1. Content structure and homepage design | Week 1 | Final page outline, content inventory, shared palette/type/spacing decisions, desktop and mobile homepage design, first consolidated revision round. | The first-screen message, section order, navigation, service groups, and inquiry action are settled. |
| 2. Shared components and core pages | Week 2 | Responsive header/footer, branded blocks, Home, About, Contact layout, CMS schema and draft preview. | The design works at mobile and desktop sizes and editors can update representative content. |
| 3. Full content and lead flow | Week 3 | Services, Who We Work With, approved clients/team content, final page copy, stored inquiries and configured notification delivery. | All five pages are complete; form success/failure and admin access have been checked. |
| 4. Revisions and launch | Week 4 | Second consolidated revision round, responsive/browser QA, SEO/performance checks, production preparation and launch. | Launch acceptance criteria pass and final content/launch readiness is confirmed. |

Aim to use the first major revision round on the homepage direction and the second on the complete site. Complete minor implementation corrections during QA. Keep the new content in preview/staging until it is ready to replace the Coming Soon page.

The proposal includes first-year hosting and 30 days of post-launch technical support. Before deployment, verify the actual hosting setup, domain access, database/media backups, and email configuration; provider choice and service costs have not been assessed in this planning pass.

## Content needed and fallback decisions

| Input | Needed for | If not yet available |
| --- | --- | --- |
| Approved company profile, mission, vision, and meaning of FILAS | About and final messaging. | Use clearly marked draft text in the design review. |
| Confirmed service list and practical descriptions | Services, Home summaries, inquiry choices. | Use the proposal's list as the draft inventory. |
| Approved client names, logos, and relationship wording | Trust section and Who We Work With. | Hide the logo section until approvals are ready. |
| Team names, roles, biographies, photographs | Optional About team section. | Launch the company story without a team listing. |
| Operations/warehouse/activation photography | Visual evidence and page variety. | Keep the design effective with typography and the existing logo. |
| Approved public contact details, social links, privacy text | Contact and footer. | Keep these as explicit content gaps; do not publish invented details. |
| Inquiry recipient and sender/domain access | Working notification delivery. | Build/test locally or with a controlled test recipient; confirm final routing before launch. |
| Deployment and DNS access | Production preparation. | Complete the website in preview first. |

The proposal's tentative client list is an approval checklist, not publishable proof: Aboitiz/Pilmico, Surechoice Pharma, Truvia, MumMum, KinderCare, Anson's Emporium, Yummy Organics, and Tai Son. Confirm exact display names and the nature of each relationship. Avoid implying endorsement, platform accreditation, or quantified results without supplied evidence.

## Launch acceptance criteria

- All five main pages contain approved content, working navigation, and a clear route to an inquiry.
- The same FILAS palette, type hierarchy, section spacing, and navigation behavior work on mobile, tablet, and desktop, including at narrow widths and increased text size.
- Keyboard navigation, focus visibility, menu behavior, labels, validation feedback, contrast, and reduced-motion behavior have been checked.
- An administrator can edit and preview a page, service, client/logo, contact detail, and image without editing code. Draft/unapproved content stays private.
- Valid inquiries are stored and delivered to the confirmed mailbox; invalid, spam, duplicate, and delivery-failure paths are handled; submission data is private.
- Unique page metadata, canonical URLs, social previews, favicon, sitemap, robots behavior, and any needed redirects are verified on the actual deployment URL.
- Template seed content and unused public routes are reviewed for removal or exclusion from the launch experience.
- Images are sized appropriately, below-fold media is loaded appropriately, and representative mobile/desktop performance checks are complete.
- Type generation, TypeScript checking, linting, production build, and focused tests pass. Use meaningful tests for public/draft access, inquiry validation/storage/delivery failures, publishing updates, and navigation; visually review responsive layout.
- HTTPS, domain routing, database/media persistence, backups, preview isolation, and a rollback path are verified before replacing the live holding page.

## First implementation slice

After the planning direction is settled, begin with the shared design tokens, navigation, hero, and the next two homepage sections. Present them at desktop and mobile widths with the draft hero copy above. This creates a concrete design review before applying the system across the five pages.

No application source was changed as part of this planning draft.
