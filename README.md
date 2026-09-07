# Ninetynine41

Client site for [Ninetynine41](https://ninetynine41.org/), a Brisbane-based
charity, migrating off WordPress/WooCommerce onto this stack. Built from
Capote Design's [agency starter](https://github.com/markperic/Claude-Agency-System) —
pages are composed from the numbered module catalog in `src/registry/modules/`
(see **[MODULE-LIBRARY.md](./MODULE-LIBRARY.md)**), though every real page in
this repo ended up as its own hand-built `src/components/<page>/*.tsx` set
rather than a bare module composition — see "Architecture" below.

Brand: green `#20321a` primary, orange `#ff5b00` secondary, Inter (body) /
Space Grotesk (display).

## Status (as of 2026-09-07)

- **Marketing pages** — Home, About, What We Do, Projects, OFFLINEFOR99,
  Donate, Churches, Our Team, Contact — all built, all real content.
- **Sanity CMS** — live. Every page above is fully editable in Studio
  (see below), not just placeholder content.
- **Medusa commerce backend** — live on Railway, with real Shop2Give
  products imported and a working `/shop` + `/shop/[handle]` storefront
  (browsing + add-to-cart work end-to-end). **No payment provider is
  configured yet**, so checkout can't actually complete — that's the next
  real blocker, and it's a business decision (which provider, shipping
  rates, tax) rather than something to just wire up.
- **Not started**: Resend for the site's forms (Offline99 registration,
  Contact) — they currently just call `preventDefault()` and go nowhere.

## Quick start (new machine)

```bash
npm install
cp .env.example .env.local   # then fill in the real values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Env vars

`.env.example` lists every key this app needs. Where to get the real values:

| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | [sanity.io/manage](https://sanity.io/manage) → this project (`41z0w6ww` / `production`) |
| `SANITY_API_WRITE_TOKEN` | Sanity → API → Tokens (Editor access) — only needed to run `npm run seed:sanity` |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | The Medusa backend's Railway domain (currently `https://backend-production-fb4ea.up.railway.app`) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa Admin → Settings → API Key Management → Publishable Keys |

Or just `vercel env pull` — Production/Preview/Development all already have
these set.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Motion · Lenis ·
TypeScript · Sanity (CMS) · Medusa.js v2 (commerce, separate repo/deploy).

## Architecture

Pages are composed from a numbered module catalog (`src/registry/modules/`,
indexed in `modules.json`) plus a lettered animation-effect catalog
(`src/registry/lib/motion-variants.tsx`) — see **[MODULE-LIBRARY.md](./MODULE-LIBRARY.md)**
for the full workflow. In practice, every real page's sections live in their
own `src/components/<page>/*.tsx` files with real content (not shared
parametrized components) — the module catalog is the starting point/reference,
not what ships. `src/app/example` still shows a page built by pure module
composition, for reference.

## Sanity CMS

Embedded Studio at **`/studio`** (locally or on the deployed site). One
singleton document per page (`homePage`, `aboutPage`, etc.) plus
`siteSettings` (email/location/social links, shared by header/footer/contact)
and two collections, `project` and `teamMember`. Data-fetch layer is
`src/lib/content/*.ts` — see that directory before adding new editable
copy to a page.

```bash
npm run seed:sanity   # one-off: migrates hardcoded copy into Sanity docs, safe to rerun
```

## Medusa commerce (Shop2Give)

The Medusa backend is a **separate repo**:
[markperic/ninetynine41-medusa](https://github.com/markperic/ninetynine41-medusa),
deployed on Railway (project `ninetynine41-medusa`, three services: `backend`,
`Postgres`, `Redis`).

- **Admin dashboard**: `https://backend-production-fb4ea.up.railway.app/app`
  — login `admin@ninetynine41.org`, password is the `ADMIN_PASSWORD` env var
  on the `backend` Railway service (not stored anywhere else — check there,
  or reset it if needed).
- **Deploys are manual, not git-push**: Railway's GitHub auto-deploy hit an
  unresolved account-linking bug, so pushing to that repo's `main` does
  *not* deploy. To ship a backend change:
  ```bash
  cd ../ninetynine41-medusa   # sibling directory
  railway up --service backend
  ```
- Product images are hosted by Medusa itself (a Railway Volume, not
  external URLs) — see that repo's `medusa-config.ts` comments if touching
  file storage.
- Storefront-side integration lives in *this* repo at `src/lib/medusa/` and
  `src/app/shop/`.

## Working with the module system

See `src/app/example` for a worked example composing modules into a full
page, and `MODULE-LIBRARY.md` for how to pick/extend modules — most useful
if adding an entirely new page from scratch rather than editing an existing
one (existing pages are hand-built per-page components, see Architecture).
