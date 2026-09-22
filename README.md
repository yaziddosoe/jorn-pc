# jorn's PC

Official website for **jorn's PC** — hand-built custom PCs, repairs &amp; upgrades, and quality components.

A fast, animation-rich, mobile-friendly shop-site. Built with **plain HTML / CSS / JavaScript** — no frameworks, no build step, free to host on GitHub Pages.

## Pages

| Page | Path | What's on it |
|---|---|---|
| Home | `index.html` | Product-reveal hero (JORN ONE), featured PCs, short "Why JORN", accessories teaser, FAQ, CTA |
| PCs | `products.html` | Full store grid with live "Add to cart" |
| Product detail | `product.html?id=jorn-one` (also `jorn-glide`, `jorn-craft`, `jorn-flux`) | Spec chips over CSS PC art, performance bars (FHD/QHD/UHD + existing benchmarks), clicking a spec row highlights the matching chip, quantity stepper, Add to cart / Buy now, related accessories |
| Build | `build.html` | Interactive **Build Your PC** configurator — pick all 7 parts (CPU → PSU), live total, case diagram that lights up, parts manifest, add the config to cart |
| Accessories | `accessories.html` | Keyboards / Mice / Monitors / Headsets / Mousepads / RGB &amp; Desk — filterable, add to cart, all categories feed the cart too |
| About | `about.html` | The story, four core values, CTA |
| Services | `services.html` | Repairs, upgrades, components, cleaning, data recovery, tune-ups + pricing table |
| Contact | `contact.html` | Email &amp; Discord cards with copy buttons, enquiry form (opens a pre-filled email), hours |

## Cart

Everything in the shop lands in one persistent cart:

- Slide-in drawer (add / remove / quantity steppers / per-line totals / subtotal / empty state)
- Count badge in the header on every page
- Persists in `localStorage` across pages and refreshes
- **Checkout** composes a real order email via `mailto:` (subject + itemised body) — pre-filled, just send
- "Buy now" on a product page adds it then opens the same checkout

## Data

All products, parts and accessories live in one file, `js/data.js` (`window.JORN`). Edit prices, specs, stock hype — the pages render themselves. The cart engine is `js/cart.js`; page wiring is `js/main.js`.

## Animations included

- **Page-switch hop curtain** — a full-screen azure curtain hops in and out on every navigation
- **Loader v2** — logo, progress bar and cycling status text ("Booting systems" → "Final checks"), skipped on repeat visits
- **Product reveal** — flagship hero: spotlight cone, rotating RGB trail, component chips gliding in, pre-reveal tags flipped (CSS-only, transform/opacity)
- Blur-to-sharp scroll reveals, hero parallax (desktop, transform-only), floating PC art, gliding chips, particles that pause off-screen
- Hover glow + 3D tilt on cards, animated stat counters, sticky nav, back-to-top, themed scrollbar
- Respects `prefers-reduced-motion`

## Performance notes

Tuned to stay smooth (60fps) on modest laptops:

- All continuous animations are `transform`/`opacity`-only → GPU compositor, no per-frame repaints.
- No `backdrop-filter` blur (a common cause of GPU hangs on Windows).
- Off-screen hero animations and sections are paused / skipped (`content-visibility`), so they cost ~0 while scrolling.
- Hero/stage art is scaled down on mobile to keep budget GPUs happy.

## Customize it (2-minute checklist)

| What | Where |
|---|---|
| Real email address | `contact.html` + `js/cart.js` — `hello@jornspc.example` |
| Real Discord invite | `contact.html` — `discord.gg/jornspc` |
| Social media links | footer of every page — `class="social-link"` (currently `href="#"`) |
| Prices &amp; specs | `js/data.js` — `JORN.pcs`, `JORN.builder`, `JORN.accessories` |
| Brand colors | `css/style.css` — `--azure` / `--ice` variables at the top |

> Cart checkout and the enquiry form open the visitor's email app with a pre-filled message. Swap the placeholder address for your own to receive real submissions.

## Deploy to GitHub Pages (free, public URL)

1. Create a repo on GitHub (or use the CLI below).
2. Push these files to the `main` branch **at the root of the repo**.
3. Go to **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

## Local preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```