# Halloween at Bakehouse

Keeps the original all-season homepage hero and adds a Halloween product feature below it, a Halloween egg tart in the existing catalogue, and Boo, a floating witch-hat ghost that tastes the exact product added to the cart. Eating is a visual interaction only: cart quantities, totals, persistence and checkout use the existing cart provider.

## Maintenance

The repository contains a production build rather than the original React source project. The original bundle and stylesheet are retained. `assets/halloween.js` contains readable React components; `assets/halloween.css` contains the seasonal styling. `scripts/build-halloween.py` applies asserted integration edits to the original bundle and writes `assets/index-halloween.js`. Run it with Python 3 after changing the integration or product data. It is repeatable and does not need an npm installation. If the original app is rebuilt with different symbols, update the integration script before running it.

The new product uses the existing demo store's $43 egg tart price. Copy, ingredients, price and generated product photography are concept content for the existing student demo. No real availability or ordering service is added.

## Companion

- Add bread, pastries or cookies from the homepage, product cards, or product detail page to trigger a taste. Packaging and drinks do not trigger eating.
- The companion uses the added product's image and name, with catch, nibble and celebration states.
- Rapid additions queue independently of cart updates. Visual queue length is bounded to eight waiting treats.
- Click Boo to say hello. The 40px close control is above the ghost, and the choice persists across page loads. A small restore control works on every route.
- Animations respect `prefers-reduced-motion`. Buttons have accessible names and keyboard focus styles. Feedback is announced through a polite status region.
- Notifications appear below the header; the existing scroll-to-top control is moved left to keep the pet clear.

## Product image

`images/products/halloween-egg-tarts.jpg` was generated with the built-in image generation tool, then resized and JPEG-optimized for this website (1200 × 800).

## Homepage photography

The three original homepage slides remain in the same order and now use higher-resolution photographs:

- `images/home/hero-egg-tarts.jpg` (1946 × 1557): [Bakehouse Occasions Signature Egg Tarts](https://occasions.bakehouse.hk/products/signature-egg-tarts), image served from Bakehouse's product page.
- `images/home/hero-chef-store.jpg` (2400 × 1600): [BrandCraft Bakehouse project](https://brandcraft.hk/project/bakehouse), the source of the earlier low-resolution storefront photograph.
- `images/home/hero-store-interior.jpg` (1778 × 1000): [Bakehouse locations](https://www.bakehouse.hk/locations), an official storefront photograph.

Generation prompt:

> Use case: product-mockup. Asset type: premium bakery website seasonal product photograph, landscape 3:2 composition. Create a photorealistic Halloween limited edition sourdough egg tart assortment: crisp golden laminated pastry shells filled with caramelised pumpkin-orange egg custard, little dark chocolate bat wings and tiny white meringue ghosts with two chocolate eyes, tasteful Halloween decorations on the tarts. Three beautiful tarts on a small ivory ceramic plate, a fourth tart cut open showing silky custard and flaky layers. Warm cream linen table with a little pumpkin blurred in background, warm autumn sunlight, restrained burnt orange and deep plum accents, elegant editorial food photography, appetizing natural bakery textures, close three-quarter camera view. No text, no logos, no watermark. Realistic edible decorations, cute not scary.

## Validation

- Node syntax checks on the seasonal module and integrated production bundle.
- Local browser verification of homepage feature, product detail, additions from different entry points, queued feedback, persisted cart quantities, and total ($124.50 for two Halloween egg tarts and one mini croissant).
- Responsive layout reviewed in a 390px iframe and a desktop browser.

Serve the repository as `/bakehouse/`, matching its existing GitHub Pages asset URLs. Hash routing is retained.

## Typography refinement

All new website content is English-only. The type scale was informed by the official Bakehouse and Tartine websites, with sizes adapted to this existing demo rather than copied wholesale.

The official Bakehouse stylesheet defines a 1rem body size and a 3.25rem base h2, with smaller heading rules at mobile breakpoints. This site uses 16px body text, fluid 48–88px hero headings, 32–44px section headings, 22–24px product headings, 14–15px buttons, 13px captions, and 13–14px pet feedback. Seasonal display headings remain a warm editorial serif, while the existing Barlow Condensed and DM Sans families remain in use elsewhere.

References:
- https://www.bakehouse.hk/
- https://cdn.prod.website-files.com/5f3cf08a203847e03aec14f9/css/bakehouse.webflow.shared.9b4869cb2.css
- https://tartinebakery.com/

## Draggable cart guide

Boo supports pointer dragging with a movement threshold, pointer capture, viewport bounds and responsive resizing. Touch dragging does not scroll the page. Keyboard users can focus Boo and use arrow keys to move it. Dragging does not trigger the greeting click. The first message explains Add to Cart, and a menu link helps customers choose a treat.
