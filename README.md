# jorn's PC

Official website for **jorn's PC** — hand-built custom PCs, repairs &amp; upgrades, and quality components.

A fast, animation-rich, mobile-friendly shop built with **plain HTML / CSS / JavaScript** — no frameworks, no build step, free to host on GitHub Pages.

## Structure — five experiences

| Experience | Path | What's on it |
|---|---|---|
| Home | `index.html` | **Opening screen** ("Built Different." → Explore PCs / Build Yours) with a drifting machine photo → **Choose Your Machine** (JORN CORE / ELITE / TITAN; hovering wakes the glow over each machine's photo) → **`JORN // REVEAL`** — a scroll-staged unveil: the machine photo appears in the dark, RGB fires up, the camera sweeps over the build, then pulls back to "Ready to build yours?" |
| PCs | `products.html` | All three ready-built machines with live "Add to cart" |
| Product detail | `product.html?id=jorn-titan` (also `jorn-elite`, `jorn-core`) | Spec chips over a real machine photo, performance bars (FHD/QHD/4K + bench), clicking a spec row highlights the matching part, quantity stepper, Add to cart / Buy now, related Setup gear |
| Build | `build.html` | Interactive **Build Your PC** configurator — pick all 8 parts across 8 categories (~85 options, CPU → PSU incl. motherboard), live total, case diagram that lights up, parts manifest, add the config to cart |
| Setup | `accessories.html` | Monitors / keyboards / mice / headsets / mousepads / RGB &amp; desk — filterable, add to cart |
| Cart | `js/cart.js` (drawer on every page) | Persistent drawer + count badge + `localStorage` + itemised `mailto:` checkout |

About JORN lives in the footer (a short blurb + badge row). Services &amp; contact are kept as slim support pages reachable from the footer's *Support* column.

## Cart

- Slide-in drawer: add / remove / quantity steppers / per-line totals / subtotal / empty state
- Count badge in the header on every page; persists in `localStorage`
- **Checkout** composes a real order email via `mailto:` — pre-filled, just send
- "Buy now" on a product page adds then opens the same checkout

## Data

All products, parts and accessories live in `js/data.js` (`window.JORN`). Edit prices/specs and the pages render themselves. Cart engine is `js/cart.js`; page wiring incl. the reveal driver is `js/main.js`. Machine photos (royalty-free, bundled locally in `assets/pcs/`) drive the store cards, product pages, opening hero and reveal. Machine tiers: **CORE** ($1,299), **ELITE** ($2,299), **TITAN** ($4,299). Builder catalog: **8 categories, ~85 parts** (CPU / GPU / RAM / storage / cooling / case / PSU / motherboard) + 4 one-click presets.

## Fail-safe (no more blank pages)

- The preloader now also **hides itself with a pure-CSS animation** (`preloaderOut`, 4.4s delay) — even if all JS fails, content is never stuck underneath it.
- Each page module in `main.js` boots inside its own `try/catch`, so one failure can't blank the whole app.
- The reveal stage fails open to a static showcase, and the `<noscript>` style block force-shows all sections with JS off.
- `window.matchMedia` is guarded so older browsers can't throw at the top of `main.js`.

## Animations

- **Page-switch hop curtain** — azure curtain hops in/out on every navigation
- **Loader v2** — logo, progress bar, cycling status text ("Booting systems" → "Final checks"), skipped on repeat visits; CSS fail-safe auto-hide (see above)
- **`JORN // REVEAL`** — scroll-driven staging on the home page: opacity-in → RGB glow-up → camera sweep over the machine photo → pull-back into "Ready to build yours?"
- Blur-to-sharp reveals, GPU-cheap `transform`/`opacity`-only animation, particles paused off-screen, hover glow reaction and photo zoom on PC cards, ambient drifting hero photo on the opening screen
- **Alive scrolling** — a fixed ambient light field (slow-drifting glow orbs) so no scroll position is ever flat black, a top hairline showing page scroll progress, scroll-linked drift on the machine cards, and a specs ticker marquee under the machine grid. The reveal backdrop drifts light beams and rising motes while you scroll (all compositor-only)
- Respects `prefers-reduced-motion` (reveal collapses into a static showcase + CTA)

## Performance notes

- All continuous animation is `transform`/`opacity`-only → compositor, no per-frame repaints.
- No `backdrop-filter` blur.
- Off-screen sections paused / skipped (`content-visibility`); fan blades hidden on small screens.
- Respects `prefers-reduced-motion`.

## Customize it

| What | Where |
|---|---|
| Real email address | `contact.html` + `js/cart.js` — `hello@jornspc.example` |
| Real Discord invite | `contact.html` — `discord.gg/jornspc` |
| Social media links | footer of every page — `class="social-link"` (currently `href="#"`) |
| Prices &amp; specs | `js/data.js` — `JORN.pcs`, `JORN.builder`, `JORN.accessories` |
| Reveal pacing | `js/main.js` — `drawReveal()` stage windows (0.08/0.34/0.46/0.60/0.76/0.94) |
| Brand colors | `css/style.css` — `--azure` / `--ice` at the top |

> Cart checkout and the enquiry form open the visitor's email app with a pre-filled message. Swap the placeholder address for your own.

## Deploy to GitHub Pages

1. Create a repo on GitHub.
2. Push these files to `main` **at the repo root**.
3. **Settings → Pages → Source: `Deploy from a branch` → branch `main`, folder `/ (root)` → Save**.
4. Live at `https://<username>.github.io/<repo-name>/`.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```