# Tech Immigrants Landing Page

Landing page for the [Tech Immigrants](https://techimmigrants.com) community — a volunteer-driven community sharing real immigration and tech career experiences from Iranians working in the tech industry worldwide.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (video data)

## Development

```sh
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your Supabase credentials in .env

# Start dev server
npm run dev
```

## Deployment

Deployed on Cloudflare Pages at `techimmigrants.com/fa/`.

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in Cloudflare Pages dashboard.
