# jam-statz — project state

> updated: aug 2026 — backend removed, app is a fully static prerendered frontend on mock data

## structure

```
jam-statz/
├── frontend/                     # sveltekit app (only app in the repo)
│   ├── package.json
│   ├── svelte.config.js          # adapter-static (was adapter-auto)
│   ├── vite.config.js            # sveltekit + @vite-pwa/sveltekit + pluginTimings check off
│   ├── src/
│   │   ├── app.html              # html shell (mona theme, dark/light mode)
│   │   ├── lib/
│   │   │   ├── components/       # 10 reusable components (see table below)
│   │   │   ├── data/             # mock data (shows.js, artists.js) — single source of truth
│   │   │   └── server/
│   │   │       └── api.js        # local data engine: computes stats/lists/details from mock
│   │   │                         #   data. same interface as the old BFF client — no fetch.
│   │   └── routes/
│   │       ├── +layout.svelte    # app shell: appbar, sidebar nav, dark mode, PWA
│   │       ├── +layout.js        # `export const prerender = true` — whole app is static
│   │       ├── +page.server.js   # dashboard load: stats + recent shows (via api)
│   │       ├── +page.svelte      # dashboard
│   │       ├── layout.css        # tailwind + skeleton + mona theme
│   │       ├── artists/
│   │       │   ├── +page.server.js + +page.svelte   # artists listing (card grid)
│   │       │   └── [id]/+page.server.js + +page.svelte  # artist detail
│   │       ├── shows/
│   │       │   ├── +page.server.js + +page.svelte   # shows listing (search + sort + cards)
│   │       │   └── [id]/+page.server.js + +page.svelte  # show detail
│   │       └── venues/
│   │           ├── +page.server.js + +page.svelte   # venues listing (card grid)
│   │           └── [slug]/+page.server.js + +page.svelte  # venue detail
│   └── static/
│       └── icon.svg              # app icon (purple rounded rect with "J")
├── backend/                      # empty — go api was deleted (see history below)
├── Makefile                      # frontend-only targets: install/dev/build/test/lint/format/clean
├── .prettierrc
├── .prettierignore
├── .gitignore
├── README.md
└── PROJECT_STATE.md
```

git note: working tree has an uncommitted restructure (root `src/` -> `frontend/`, BFF page loads,
venues page). `backend/` contents were deleted and were never committed on this branch — keep it
that way when committing.

## history / key decisions

- started as a single sveltekit app with inline mock data (`src/lib/data/*`)
- grew a go + sqlite read-only api (BFF via `API_BASE_URL`); that backend has since been **deleted**
- app now runs **entirely on mock data**: `frontend/src/lib/server/api.js` serves the exact same
  interface (`api.stats/shows/show/artists/artist/artistShows/venues/venue/venueShows`) computed
  locally from `frontend/src/lib/data/` — pages never touch the data source directly, so swapping
  in a real db later is a drop-in change to one file
- switched to `@sveltejs/adapter-static` + `prerender = true`: build emits clean static HTML in
  `frontend/build/`; PWA service worker precaches it (also fixed the workbox empty-glob warning)
- build is warning-free (fixed `state_referenced_locally` in dashboard, pinned adapter, silenced
  rolldown PLUGIN_TIMINGS diagnostic)

## frontend

| layer     | choice                                             |
| --------- | -------------------------------------------------- |
| framework | sveltekit 2                                        |
| language  | javascript (no typescript)                         |
| ui        | skeleton ui v4 + tailwind css v4                   |
| icons     | lucide-svelte                                      |
| pwa       | `@vite-pwa/sveltekit` (workbox sw + auto manifest) |
| build     | vite 8 (rolldown)                                  |
| adapter   | `@sveltejs/adapter-static`, fully prerendered      |
| theme     | mona (purple/green/teal psychedelic)               |

## pages

| page          | route            | description                                                 |
| ------------- | ---------------- | ----------------------------------------------------------- |
| Dashboard     | `/`              | stat cards, top 5 artists, top 5 venues, recent shows       |
| Artists       | `/artists`       | card grid of all artists with show counts                   |
| Artist Detail | `/artists/[id]`  | artist info, next show banner, show history with pagination |
| Shows         | `/shows`         | searchable/sortable list of attended shows                  |
| Show Detail   | `/shows/[id]`    | venue, date, duration, full setlist, notes                  |
| Venues        | `/venues`        | card grid of all venues with show counts                    |
| Venue Detail  | `/venues/[slug]` | venue info, next show banner, show history with pagination  |

## reusable components

| component    | props                                | used in                          |
| ------------ | ------------------------------------ | -------------------------------- |
| `PageHeader` | `title`, `subtitle`                  | all pages                        |
| `BackLink`   | `href`, `label`                      | all detail pages                 |
| `InfoCard`   | `icon`, `label`, `value`, `subtext?` | artist/venue/show detail         |
| `StatCard`   | `icon`, `label`, `value`, `href?`    | dashboard                        |
| `ShowCard`   | `show`, `href?`                      | shows page, ShowList             |
| `ShowList`   | `shows`, `title?`, `emptyText?`      | artist/venue detail              |
| `Setlist`    | `setlist`                            | show detail                      |
| `BannerCard` | `label`, `title`, `detail?`, `date?` | artist/venue detail (next show)  |
| `EmptyState` | `message`, `href?`, `linkText?`      | artist/venue/show detail (404)   |
| `RankedList` | `title`, `items`, `icon?`            | dashboard (top 5 artists/venues) |

## mock data

Lives in `frontend/src/lib/data/` (restored from git history, commit `8de7d8d`):

- **20 attended shows** with ratings and notes (no setlists/durations in this dataset yet)
- **10 artists** with genre/hometown metadata
- venues are derived from show records at runtime (`slugify(venue name)`)

## sidebar navigation

Dashboard → Artists → Shows → Venues

## make targets (frontend only)

install · dev · preview · build · test (compile-check) · lint/format (prettier) · check · clean

## next up

1. **data model design** (in progress): split canonical events from personal experience once
   multi-user lands — artists / venues / shows are shared; attendance (attended, rating, notes)
   becomes a per-user join table instead of living on the show record
2. pick persistence: cloudflare d1 (sqlite at edge, deploys with pages) vs re-standing a server;
   swap internals of `$lib/server/api.js`, flip `prerender = false` on dynamic routes only
3. user authentication (needed for per-user listings)
4. show add/edit flows (write ops)
5. mobile polish, follow artists for notifications
