# Fihuma NT QR Flow

Onepage QR-flyer lead funnel for Fihuma Isolatie. Users answer a few insulation/subsidy questions and leave contact details. Data is stored in Supabase.

## Setup

```bash
cd /Users/luuksiers/NietThuisFlow
npm install
```

## Development

```bash
npm run dev          # Start dev server on http://localhost:3000
```

## Quality checks

```bash
npm run typecheck    # TypeScript type check (tsc --noEmit)
npm run lint         # ESLint
npm run build        # Production build
npm run check        # All three in sequence
```

## Git hooks

Install the pre-push hook (runs `npm run check` before every push):

```bash
sh scripts/install-hooks.sh
```

To skip the hook in an emergency: `git push --no-verify`

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Supabase (insert-only, no auth)
- Mobile-first, Dutch language
