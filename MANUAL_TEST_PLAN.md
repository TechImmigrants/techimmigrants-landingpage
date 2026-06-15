# Manual Test Plan — Tech Immigrants Website

Run through this checklist before publishing or after meaningful changes.
Mark each case Pass / Fail and note anything unexpected.

## Setup

```sh
npm install
npm run dev      # http://localhost:8080/fa/
```

For the Supabase-off case, run with no `.env`. For the Supabase-on case, add
valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env` and restart.

## Test Cases

| # | Test | How to verify | Expected |
| --- | --- | --- | --- |
| 1 | Site opens locally | `npm run dev`, open `/fa/` | Homepage renders, no console errors |
| 2 | Build passes | `npm run build` | Exit 0, output in `dist/fa/` |
| 3 | Lint/typecheck | `npm run lint` | 0 errors (pre-existing shadcn warnings OK) |
| 4 | Hero is clear | Read hero | Explains what Tech Immigrants is; 3 CTAs (join / watch / partner) |
| 5 | Persian / RTL layout | Inspect `<html dir="rtl" lang="fa">`; visual | Text right-aligned, layout mirrored, Persian numerals render |
| 6 | Mobile menu works | Narrow window < 1024px, tap menu | Menu opens/closes, links scroll/navigate, closes after click |
| 7 | Stats render | Trust section | 8 stat cards with editable values |
| 8 | Migration journey renders | Journey section | 7 stages, each with emotion, question, how-we-help |
| 9 | Community Intelligence renders | CI section | 5 aggregate stats, insight + privacy note, "report coming soon" |
| 10 | Programs render | Programs section | 8 program cards with correct status badges |
| 11 | Product Builders renders | Product Builders section | Description + pilot badge + 3 CTAs |
| 12 | Resources/video WITH Supabase | Add real keys, restart | Live sessions load; no "sample" notice |
| 13 | Resources/video WITHOUT Supabase | No `.env` | Sample sessions show with a clear "sample" notice; no crash |
| 14 | Video loading/empty/error states | Throttle / break network | Skeletons while loading; graceful fallback on error |
| 15 | Sponsorship packages render | Partners section | 5 packages; accepted vs not-accepted lists; disclosure note |
| 16 | Partner CTA works | Click "شریک ما شوید" / contact | Scrolls to contact / opens mailto |
| 17 | `/partners` page works | Visit `/fa/partners` | Dedicated page with intro, stats, packages, contact |
| 18 | Support is secondary | Support section | Below partnership; "support optional, community stays free" tone |
| 19 | FAQ works | FAQ section | Accordion opens/closes; all 10 questions present |
| 20 | Footer links | Footer | Social links, quick links, trust note "we do not sell community data" |
| 21 | All internal links | Click nav + footer links | Anchors scroll; routes load; no dead links |
| 22 | 404 page | Visit `/fa/does-not-exist` | On-brand Persian 404 with "back home" |
| 23 | SEO metadata | View page source / `dist/fa/index.html` | Title, description, canonical present |
| 24 | Open Graph metadata | View source | og:title/description/image/url + twitter card present |
| 25 | Structured data | View source | JSON-LD Organization block present |
| 26 | No private community data | Review all sections | Only aggregate/anonymized stats; no private messages, no Telegram dumps |
| 27 | No undisclosed sponsorship language | Review partners/support | Disclosure note present; no hidden-sponsor wording |
| 28 | No "selling community data" language | Review all | Explicit "we do not sell community data" statements |
| 29 | Responsive: mobile | ~375px width | Single column, readable, no overflow |
| 30 | Responsive: tablet | ~768px width | 2-column grids, menu still hamburger or fits |
| 31 | Responsive: desktop | ≥1280px width | Full nav, multi-column grids, centered container |
| 32 | Keyboard navigation | Tab through page | Focus visible on links/buttons; menu reachable |

## Notes / Findings

- _Record any failures here with steps to reproduce._
