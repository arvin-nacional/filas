# About page

Five new reusable Payload blocks are available under Pages > Content:

1. **About Hero** — eyebrow, heading, emphasis, and introduction.
2. **Company Story** — brand promise, editable paragraphs, and closing statement.
3. **Mission & Vision** — separate labels and statements.
4. **Our Principles** — reorderable titles and descriptions.
5. **Leadership Team** — reorderable names, roles, optional portraits and biographies.

Reuse the existing **Contact Invitation** as the final section. The shared
frontend layout supplies the CMS header and footer. Set the generic page Hero to
None when using About Hero, to avoid duplicate page headings.

The team defaults use the supplied names and roles:

| Name | Role |
| --- | --- |
| Ray Caguin | Co-Founder & Chief Executive Officer |
| Klang Sanchez | Co-Founder & Chief Creative Officer |
| Gretchen Choa | Co-Founder & Chief Strategy Officer |
| Nas Arcayan | Commercial Head |
| Gelo Alterado | Head of Accounts |
| Aristo de Borja | Finance Head |

Until photos are supplied, decorative initials fill the portrait area. Biographies
are optional and start empty. No portraits, credentials, or personal histories
have been invented. Company story, mission, vision, and principles are suggested
copy for review before publication.

`node --import=tsx/esm scripts/prepare-about-draft.ts --write` creates an unpublished
**About FILAS** page with slug `about`, six sections, and all six people. It preserves
an existing About page and does not edit Home, Header, or Footer. It verifies that
the new draft is invisible to anonymous queries. Without `--write`, it only checks
whether the page exists. Use Payload's Preview control to review the draft.

There is no static `/about` fallback; public routing uses saved CMS content. Because
the database is currently shared with production, keep the page unpublished until
the separate development CMS is configured. See [branch setup](branch-preview.md).
