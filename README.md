# Ninetynine41

Client site for [Ninetynine41](https://ninetynine41.org/), a Brisbane-based
charity, migrating off WordPress/WooCommerce onto this stack. Built from
Capote Design's [agency starter](https://github.com/markperic/Claude-Agency-System) —
pages are composed from the numbered module catalog in `src/registry/modules/`
(see **[MODULE-LIBRARY.md](./MODULE-LIBRARY.md)**), not designed fresh.

Brand: green `#20321a` primary, orange `#ff5b00` secondary, Inter (body) /
Space Grotesk (display).

## Roadmap

1. ~~Repo + Vercel scaffold~~
2. Landing page design (hero with Lenis-driven scroll transitions)
3. Remaining marketing pages
4. Sanity CMS integration
5. Ecommerce (Medusa.js) for the SHOP2GIVE tee shirt/merch line

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · Lenis ·
TypeScript. Sanity and Medusa land in later phases — see Roadmap above.

## Working with the module system

`src/app/page.tsx` is currently the inherited catalog index from the starter —
it gets replaced with the real homepage in the next phase. Until then, see
`src/app/example` for a worked example composing modules into a full page,
and `MODULE-LIBRARY.md` for how to pick/extend modules.
