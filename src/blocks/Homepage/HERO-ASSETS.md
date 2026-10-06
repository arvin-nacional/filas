# Homepage hero choices

Payload offers three selectable hero blocks. Use one hero block per page, placed
first in the Layout field under Pages → your homepage → Content.

- **Growth Hero** keeps the original entrepreneur and fulfillment photos with
  overlay cards.
- **Ecosystem Hero** uses generated sculptural artwork with three service titles
  and marketplace callouts.
- **Animated Ecosystem Hero** uses a live Three.js commerce loop with service
  icons and three editable titles.

All three blocks have editable eyebrow, headline, emphasis, description, and
links. Growth Hero and Ecosystem Hero also have a footnote, marketplace names,
and optional marketplace logos. An entry without a logo displays its name.
Up to four marketplace entries are supported.

To switch designs, add the desired hero block at the top of Layout, manually copy
the page's headline, emphasis, description, footnote, links, and marketplace content
from the existing hero where supported, then remove the previous hero.
Animated Ecosystem Hero has no footnote or marketplace fields. Review the service
titles or card copy for the chosen design and preview before publishing. Replacing the
block does not automatically transfer its values. Existing Growth Hero blocks
continue to display the original design without a database migration or seed.

## Animated Ecosystem Hero

Choose Animated Ecosystem Hero in Layout to use the animated loop design. In its
Visuals group, edit Demand title, Store title, and Fulfillment title. Their defaults
are “Demand generation”, “Store management”, and “Warehousing & fulfillment”.
“Enable animation” controls motion while retaining the same visual composition.
This option uses a Three.js scene and has no artwork upload, footnote, or channel
fields. Adding the option does not replace existing hero blocks or alter saved pages.

The Three.js arrows enter in sequence—Demand, Store, then Fulfillment—fading in
and settling before their service labels appear and orbit motion begins.
The center uses the emblem from the existing FILAS logo asset, revealed as the
three arrows finish assembling.
Entrance progress pauses while the section is offscreen or the browser tab is hidden;
visitors can also pause motion. Reduced-motion preferences or disabled animation
show the completed loop as soon as WebGL is ready. The generated sculpture image
loads only if WebGL fails or its context is lost.

The animated design also includes a generated commerce background behind the live
circle: a dotted world map, analytics and storefront panels, and a fulfillment
conveyor. It fades in as the loop finishes assembling. Its transparent center
keeps the native emblem clear, and its decorative panels contain no readable
claims or metrics. It adds no icons beneath the calls to action. Asset details
and the generation prompt are in `src/blocks/Homepage/COMMERCE-BACKGROUND.md`.

To control this layer in Payload, open Pages → your homepage → Content → Layout →
Animated Ecosystem Hero → Visuals and use “Show background” (`showBackground`).
It defaults to enabled, including for existing pages without a saved value.
Uncheck it to hide the map, panels, and conveyor while keeping the circle, emblem,
service labels, and orbit dots. Recheck it to restore the background; the asset
is retained when hidden.

The development-only preview is `/hero-preview/animated`. It uses default copy
without changing CMS pages and returns 404 outside development.

## Growth Hero photo assets

Edit its Visuals group to upload an entrepreneur photo, a fulfillment photo,
and marketplace logos. Media alt text is used by the photos. Card copy and card
visibility are editable. Empty photo fields use the bundled generated PNGs.
The photos are separate raster files. Cards, chart bars, icons, and decorative
shapes are independent React/CSS layers, not flattened into the photographs.

Generated using the built-in image generation tool, September 25, 2026.

### Entrepreneur — `public/hero/entrepreneur.png`

Prompt: Generate a photorealistic editorial website hero photograph, portrait 4:5 composition. A confident Filipina entrepreneur in her early 30s with dark hair tied loosely back, wearing a black collared blouse, seated with a silver laptop at a wooden table in a modern small ecommerce warehouse office. Subject on right half looking thoughtfully toward left, hands naturally near chin holding a pen. Shelves and cardboard shipping parcels behind her, indoor green plants in foreground, warm soft daylight, sophisticated warm neutral color grade, realistic skin, shallow depth of field. Full bleed photograph only, no text, no logos, no UI, no cards, no borders. This is a standalone replaceable photographic layer for a cream and terracotta business website.

### Fulfillment — `public/hero/fulfillment.png`

Prompt: Photorealistic editorial photograph for an ecommerce fulfillment website. Portrait 4:5 crop, close view of clean kraft cardboard shipping parcels on a metal roller conveyor in a modern warehouse, parcels in sharp focus toward foreground right, conveyor receding toward upper left, soft out of focus industrial shelves behind. Warm daylight, charcoal metal, muted brown boxes, elegant realistic commercial photography, shallow depth of field. No people, text, labels, logos, borders, graphic elements or UI. Full bleed standalone photograph.

## Ecosystem Hero artwork

The bundled artwork is `public/hero/ecosystem-sculpture.webp`. It replaces the
earlier SVG illustration with a generated sculptural composition. Service titles
are overlaid on their matching loop segments, and marketplace callouts appear
alongside the hero. Both are separate React layers styled with Tailwind utilities.

Its three service titles are Demand generation, Store management, and Warehousing
& fulfillment. In its Visuals group, upload an optional replacement to
`artworkImage` and edit marketplace channels. Empty uploads use the bundled artwork.
“Show service titles and channels” (`showCards`) controls those layers.
Replacement artwork should follow the same loop composition when the titles are
enabled. Disable “Show service titles and channels” for custom artwork that uses
a different composition.
The earlier `progressLabel`,
`marketplaceLabel`, and `fulfillmentLabel` annotation fields are preserved in the
schema, hidden in the admin, and unused by this design.

### Artwork generation

Generated with the built-in image generation tool, October 6, 2026. The transparent
PNG source was converted to a 1254 × 1254 WebP at quality 90, preserving alpha.
The bundled file is 186,278 bytes.

Source: `C:/Users/Arvin/.codex/generated_images/01a11043-a2dd-7cd2-be04-78596e0c74c1/exec-cef539ca-3cd6-4914-9ee3-afe9928ea8ae.png`.

Prompt: Use case: stylized-concept. Asset type: premium corporate website hero artwork, standalone transparent PNG. Create an art-directed 3D sculpture visualizing one connected e-commerce ecosystem: exactly three broad elegant curved arrow ribbons join into a seamless clockwise circular loop, sculpted from matte terracotta/rust (#b85236), warm limestone/sand (#c8b7a1), and deep charcoal green (#303a34). A low oblique overhead camera angle, subtle perspective and generous depth, beveled rounded edges, tactile finely grained ceramic finish, realistic soft ambient occlusion, warm diffuse studio light from upper left, beautiful quiet contact shadows. Each ribbon has a refined integrated arrow tip that fits into the next; they should feel like three precisely crafted parts of a single system, not generic presentation clipart. Circle center is an open clean space, large enough for a small brand wordmark to be placed later. The loop floats slightly above a barely visible ground plane. Balanced square composition, central sculpture occupies about 85 percent of frame, 8 percent breathing room around its silhouette. Extremely polished editorial CGI, contemporary high-end brand campaign, understated but memorable. No text, letters, numerals, logos, slogans, service labels, icons, UI cards, dotted circles, grid, dashboard, decorative technical lines, people, photography, stock-photo imagery, watermarks. Transparent background with real alpha, retain soft semitransparent shadows. Output only the artwork, not a webpage mockup.
