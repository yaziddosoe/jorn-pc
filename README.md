# jorn's PC 💙

Official website for **jorn's PC** — custom PC builds, repairs &amp; upgrades, and quality components.

A fast, animation-rich, mobile-friendly company site. Built with **plain HTML / CSS / JavaScript** — no frameworks, no build step, free to host.

## Pages

| Page | Path | What's on it |
|---|---|---|
| Home | `index.html` | Animated hero (typing headline + floating PC + gliding chips), brand marquee, services preview, "why us", animated stats, featured rigs, testimonials, FAQ, CTA band |
| Custom Builds | `builds.html` | Starter / Gaming / Creator Pro tiers with SVG artwork, spec lists, prices, build process steps |
| Services | `services.html` | Repairs, upgrades, components, cleaning, data recovery, tune-ups + transparent pricing table |
| Contact | `contact.html` | Email &amp; Discord cards with copy buttons, enquiry form (opens a pre-filled email), hours |

## Animations included

- **Page-switch hop curtain** — a full-screen azure curtain hops in (overshoot bounce) and out on every navigation
- **Hero entrance hop** — badge, headline, text and buttons pop in one-by-one on page load
- **Blur-to-sharp scroll reveals** — sections fade, slide and de-blur as they enter the viewport
- **Hero parallax** — the PC art drifts subtly opposite your scroll (desktop, transform-only)
- Floating PC case (pure CSS), gliding chips, rising particles, brand marquee
- Hover glow + 3D tilt on cards
- Animated stat counters, sticky nav, preloader, back-to-top, theme scrollbar
- Respects `prefers-reduced-motion`

## Performance notes

The site is tuned to stay smooth (60fps) on modest laptops:

- All continuous animations are `transform`/`opacity`-only, so they run on the GPU compositor — no per-frame repaints.
- No `backdrop-filter` blur (a common cause of GPU hangs/crashes on Windows).
- Off-screen hero animations and sections are paused / skipped (`content-visibility`), so they cost ~0 while scrolling.
- Particle count is kept low and reduced further automatically for users who prefer reduced motion.

## Customize it (2-minute checklist)

Open these files and search/replace these values:

| What | Where |
|---|---|
| Real email address | `contact.html` — `hello@jornspc.example` (used in the form + copy button) |
| Real Discord invite | `contact.html` — `discord.gg/jornspc` |
| Social media links | `index.html`, `builds.html`, `services.html`, `contact.html` — the `class="social-link"` blocks (currently `href="#"`) |
| Prices, specs, testimonials | `index.html`, `builds.html`, `services.html` |
| Brand colors | `css/style.css` — `--azure` / `--ice` variables at the top |

> The enquiry form opens the visitor's email app with a pre-filled message. To receive real submissions, swap the placeholder address for your own.

## Deploy to GitHub Pages (free, public URL)

1. Create a repo on GitHub (or use the CLI below).
2. Push these files to the `main` branch **at the root of the repo**.
3. Go to **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

### Quick CLI version (requires GitHub CLI + git)

```bash
git init
git add .
git commit -m "Initial release of jorn's PC website"
gh repo create jorn-pc --public --source=. --push
```

Then enable Pages in Settings (or wait a minute — GitHub auto-suggests Pages once the repo has files).

## Local preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```