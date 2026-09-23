# Capabilities page

Three new reusable blocks are available under Pages > Content:

- **Capabilities Hero**: heading, introduction, and editable section jump links.
- **Capability Detail**: a group's heading, introduction, services and descriptions,
  section anchor, and ivory or warm-neutral background. Use one per service group.
- **Connected Capabilities**: explains how the capabilities work together with
  reorderable titles and descriptions on a charcoal background.

The prepared page contains the hero, four Capability Detail sections, Connected
Capabilities, the existing Our Approach block, and the existing Contact Invitation.
Its Header and Footer come from the shared frontend layout and CMS globals.
Use None for the generic page Hero when adding Capabilities Hero.

The four groups cover commerce and channels; fulfillment and systems; content and
activation; and business support. Service copy is suggested wording based on the
proposal inventory and should be reviewed before publication. No performance
metrics, accreditation, or guaranteed outcomes have been added.

Hero jump links must match the unique `anchorId` of each detail section. The
initial anchors are `commerce`, `fulfillment`, `content`, and `business-support`.
Keep these synchronized when renaming sections. In-page links remain on the
current page, including authenticated draft previews.

Run `node --import=tsx/esm scripts/prepare-capabilities-draft.ts --write` to create
the unpublished **Capabilities** page (slug `capabilities`). The command preserves
existing pages and global navigation, checks the section links, and verifies that
the newly created draft is invisible to public queries. Without `--write`, it
only checks readiness. There is no hardcoded public route or content fallback.

Use Pages > Capabilities > Preview to review. The database is still shared with
production, so keep this draft unpublished until the separate development CMS
is ready. See [branch setup](branch-preview.md).
