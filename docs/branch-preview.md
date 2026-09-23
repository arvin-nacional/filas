# Client preview on dev-site

## Branch and deployment

Keep `main` as Vercel's Production Branch. Continue development on `dev-site`.
Pushes to `dev-site` should create Preview deployments; do not promote them to
production. Share the branch URL shown in Vercel, which stays the same as new
deployments finish. Do not use an individual deployment's generated URL for an
ongoing review link.

The repository is currently on `dev-site`. These code changes have not been
pushed or deployed by the agent. Vercel's project settings have not been verified.

## Separate CMS data before editing

Production and development currently share a database. Git branches do not
isolate Payload pages, globals, users, forms, or uploaded files. Do not edit the
shared Header, Footer, or Home as a way to change only the preview site.

1. Create a separate MongoDB database for Preview, for example `filas-dev-site`.
   It can live on the same cluster. Prefer credentials restricted to that database.
2. In Vercel, scope its `DATABASE_URL` to **Preview**, specifically `dev-site`.
   Leave the Production value unchanged. Use that development connection locally
   too, so local CMS edits cannot affect production.
3. Give Preview distinct `PAYLOAD_SECRET`, `PREVIEW_SECRET`, and `CRON_SECRET`
   values. Set a separate S3 bucket and its credentials for development uploads;
   do not point media edits/deletions at production storage.
4. Redeploy `dev-site` after setting the variables. Verify the target database
   before initializing content. Create its first Payload administrator, then
   configure Header, Footer, and a Home page in that environment. If the blank
   admin exposes first-user setup, initialize it before sharing access.
5. Build Home with the six homepage blocks listed below and publish it **in the
   preview database**. Copy only approved content/assets if migrating from the
   existing CMS. Do not run the template database seed: it resets collections.

`NEXT_PUBLIC_SERVER_URL`, if set for Preview, should use the stable branch URL,
never the production domain. The server URL helper also uses Vercel's branch URL
for Preview metadata and CMS configuration. Preview pages have noindex metadata.
Noindex does not restrict access; keep Vercel's deployment protection and give
the client access through its sharing controls when needed.

## Page structure

The real homepage is `/`, including in a Vercel production-mode Preview build.
`/homepage-preview` redirects to `/` so old review links still work.

The frontend root layout owns a single Header, main content region, and Footer.
They are shared by homepage, CMS pages, posts, search, and the frontend 404.
Payload admin keeps its separate layout. Header and Footer load their Payload
globals; the navbar does not substitute hardcoded links for empty CMS navigation.

On this branch, the Home renderer omits Coming Soon. If that is the only saved
Home block, the six-section starter homepage renders instead. This is a temporary
read-only fallback while the development CMS is prepared, not a database update.
Once Home has real content blocks, those saved blocks drive the page. Drafts
remain accessible only through the normal authenticated Payload preview flow.

## Homepage blocks

Under Pages > Home > Content, arrange:

1. Growth Hero
2. Growth Introduction
3. Our Approach
4. Services Overview
5. Who We Work With
6. Contact Invitation

Approved Client Logos is an optional seventh block. It renders only approved
rows with populated image assets. Each block's text, lists, and relevant links
are editable. Growth Hero replaces the generic page hero when present.

Default section anchors are `about`, `services`, `partners`, and `contact`.
Keep anchors unique and match the Header/Footer links to them. The contact CTA
defaults to `/contact`; email delivery remains a separate setup task.

## Review workflow

Commit and push reviewed code to `dev-site`, wait for its Preview deployment,
then send the stable branch link to the client. Publish CMS progress only in the
development database. Merge into `main` and migrate approved CMS content only
when the finished site is ready to launch; merging code does not migrate data.

References:
- https://vercel.com/docs/deployments/environments
- https://vercel.com/docs/deployments/generated-urls
- https://vercel.com/docs/environment-variables
