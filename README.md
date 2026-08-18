# Tech Immigrants — Official Community Website

The official website of **Tech Immigrants**, a trusted Persian-speaking tech community founded by Sahar Pakseresht. It helps Iranian / Persian-speaking tech professionals navigate migration, job search, career growth, relocation, community support, and giving back.

The site is the community's trust hub, resource hub, program hub, and partnership entry point. Primary language is Persian (Farsi) with full RTL support.

> اعتماد کامیونیتی فروشی نیست. We do not sell community trust. We do not sell community data.

## Tech Stack

- **React 18 + TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **React Router** (SPA routing, served under the `/fa/` base path)
- **Supabase** (optional — live video/session data; the site works without it)
- **@tanstack/react-query**, **lucide-react** icons

## Local Setup

Requires Node.js 18+ and npm.

```sh
# 1. Install dependencies
npm install

# 2. (Optional) configure environment variables
cp .env.example .env
# Fill in Supabase credentials if you want live video data.
# The site runs fully without any env vars (static mode with sample sessions).

# 3. Start the dev server
npm run dev
# -> http://localhost:8080/fa/
```

### Other commands

```sh
npm run build     # Production build (outputs to dist/fa/)
npm run preview   # Preview the production build locally
npm run lint      # ESLint
```

## Environment Variables

See `.env.example`. All variables are **optional** — without them the site runs in "static mode" and shows sample session content instead of live data.

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Client (video data) | Public Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | Client (video data) | Public anon key. Safe to expose. |
| `YOUTUBE_API_KEY` | GitHub Action only | Used by `scripts/fetch-upcoming-lives.mjs`. Store as a **GitHub repository secret**, never as a `VITE_` var. |

If Supabase is not configured, `src/lib/supabase.ts` sets `isSupabaseConfigured = false`, and `useVideos()` falls back to `sampleVideos` from `src/data/videos.ts`. Network/query failures degrade gracefully to the same sample data.

## Editing Content

Almost all editable copy lives in **one file**:

```
src/config/site.ts
```

You can update the following without touching component code:

| Want to change… | Edit in `src/config/site.ts` |
| --- | --- |
| Site title / description / OG | `site.meta` (also mirror crawler tags in `index.html`) |
| Social + community links | `site.social` |
| Contact emails | `site.contact` |
| Navigation items | `site.nav` |
| Hero copy & CTAs | `site.hero` |
| Trust / proof stats | `site.trust.stats` |
| Mission points | `site.mission` |
| Migration journey stages | `site.journey.stages` |
| Community Intelligence numbers | `site.communityIntelligence` |
| Programs (cards + status badges) | `site.programs.items` |
| Product Builders / Demo Day | `site.productBuilders` |
| Resource links | `site.resources.links` |
| Sponsorship packages & principles | `site.partners` |
| Support-the-mission copy | `site.support` |
| Founder story | `site.founder` |
| FAQ | `site.faq.items` |
| Footer | `site.footer` |

### How to update stats

Edit `site.trust.stats` (homepage proof section) and `site.communityIntelligence.stats`. Use real, conservative numbers. When uncertain, prefix with `+` or label as تقریبی (approximate). Persian-Indic numerals (۰۱۲۳…) render correctly in RTL.

### How to update programs

Edit `site.programs.items`. Each item has a `status` of `"active" | "pilot" | "open-source" | "coming-soon"`, which controls the badge. `ctaLabel` / `ctaHref` are optional.

### How to update sponsorship packages

Edit `site.partners.packages`. Each package has `name`, `goodFor`, `includes[]`, and `price`.

- To **hide all prices** and show "تماس بگیرید" instead, set `site.partners.showPrices = false`.
- The accepted vs. not-accepted partnership lists live in `site.partners.accepted` / `site.partners.rejected`.

## Project Structure

```
src/
  config/site.ts          # Central editable content/config
  pages/
    Index.tsx             # Homepage (composes all sections)
    Partners.tsx          # /partners — sponsorship/partnership page
    Interviews.tsx        # /interviews — all sessions (live video data)
    Resources.tsx         # /resources — curated resource library
    Blog.tsx, BlogPost.tsx
    NotFound.tsx
  components/
    landing/              # Homepage sections (Hero, TrustStats, Journey, …)
    ui/                   # shadcn/ui primitives
    CtaLink.tsx           # Anchor / external / route-aware button
  hooks/useVideos.ts      # Supabase video loader with sample fallback
  lib/                    # supabase client, nav helpers, utils
  data/                   # videos sample data, resources, events, blog
```

## Routing & the `/fa/` base path

The app is served under `/fa/` (`basename="/fa"` in `src/App.tsx`, `base: "/fa/"` in `vite.config.ts`). In-page navigation uses smooth-scroll anchors on the homepage; from sub-pages, anchor links route back to the homepage with a hash that is respected on mount.

## Deployment

Deployed on Cloudflare Pages at `techimmigrants.com/fa/`.

- Build command: `npm run build`
- Output directory: `dist/fa`
- The build copies `_redirects` into `dist/` for SPA fallback routing.
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Cloudflare Pages dashboard if you want live data. They are not required.

## Known Limitations

See `STABILIZATION_REPORT.md` for the full status, what is safe to publish, and recommended next tasks. See `MANUAL_TEST_PLAN.md` for the manual QA checklist.
