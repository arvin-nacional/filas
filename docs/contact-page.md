# Contact page

Three Payload blocks are available in Pages > Content:

- **Contact Hero**: editable heading, emphasis, and introduction.
- **Contact Inquiry**: introduction, relationship to a Payload form, optional public
  email/phone/address, and optional privacy-policy link.
- **Contact Next Steps**: reorderable steps explaining the inquiry process.

Set the generic Hero to None when using Contact Hero. The shared frontend layout
provides the CMS header and footer. There is no static page fallback.

The supplied form collects company/brand, contact person, email, optional phone and
website/marketplace links, multiple service interests, and requirements. Phone is a
text field so country codes and leading zeros are preserved. Edit fields, button
text, confirmation, and notification settings under Forms. The frontend reuses
the existing form builder submission endpoint; it does not send email directly.

Submission defaults are keyed by field name; only configured field values are
serialized. Duplicate clicks are blocked while a request is in flight. Failures
preserve input for retry, and successful submission focuses the confirmation.
The Contact block passes only presentation fields to the client, omitting
administrative notification settings even in an authenticated draft preview.

Public contact details and the policy URL start blank. Add approved information.
The new form has no email recipients; notification delivery requires a configured
Payload email adapter and approved sender/recipient settings. The form builder
stores submissions and restricts reads to authenticated users by default. Server
validation against field definitions and abuse protection still need a dedicated
launch review before accepting public inquiries.

Run `node --import=tsx/esm scripts/prepare-contact-draft.ts --write` to create the
private draft. If a Contact page already exists, it is preserved and the new page
uses `contact-design`. Existing inquiry forms and draft content are not overwritten.
The command verifies the populated form relationship and public invisibility;
it never submits an inquiry or sends email.

Keep the page unpublished while development and production share the database.
Use Payload Preview after signing in to review it.
