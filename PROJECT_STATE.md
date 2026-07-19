# jam-statz — project state

## structure

```
jam-statz/
├── package.json
├── svelte.config.js              # adapter-auto
├── vite.config.js                # sveltekit + @vite-pwa/sveltekit
├── src/
│   ├── app.html                  # html shell (pine theme, dark/light mode)
│   ├── lib/
│   │   ├── components/
│   │   │   ├── BackLink.svelte   # arrow back link for detail pages
│   │   │   ├── BannerCard.svelte # highlighted banner (next show on detail pages)
│   │   │   ├── EmptyState.svelte # centered not-found / empty message
│   │   │   ├── InfoCard.svelte   # icon + label + value card (detail pages)
│   │   │   ├── PageHeader.svelte # title + subtitle heading
│   │   │   ├── RankedList.svelte # numbered list with title + optional icon
│   │   │   ├── Setlist.svelte    # set 1 / set 2 / encore with numbered songs
│   │   │   ├── ShowCard.svelte   # clickable show card
│   │   │   ├── ShowList.svelte   # show cards + "Show More" pagination
│   │   │   └── StatCard.svelte   # dashboard stat card with icon + optional link
│   │   └── data/
│   │       ├── artists.js        # 10 jam band artists (computed from shows)
│   │       ├── shows.js          # 23 shows (20 attended, 3 upcoming) + helpers
│   │       └── stats.js          # computed stats: totalShows, totalArtists, uniqueVenues, topArtists, topVenues
│   └── routes/
│       ├── +layout.svelte        # app shell: appbar, sidebar nav, dark mode, PWA
│       ├── +page.svelte          # dashboard
│       ├── layout.css            # tailwind + skeleton + pine theme
│       ├── artists/
│       │   ├── +page.svelte      # artists listing (card grid)
│       │   └── [id]/+page.svelte # artist detail (info, next show, show history)
│       ├── history/
│       │   └── +page.svelte      # full show history table
│       ├── shows/
│       │   ├── +page.svelte      # shows listing (search + sort + cards)
│       │   └── [id]/+page.svelte # show detail (info, setlist, notes)
│       └── venues/
│           ├── +page.svelte      # venues listing (card grid)
│           └── [slug]/+page.svelte # venue detail (info, next show, show history)
├── static/
│   └── icon.svg                  # app icon (purple rounded rect with "J")
├── .prettierrc
├── .prettierignore
├── .gitignore
├── README.md
└── PROJECT_STATE.md
```

## frontend

| layer     | choice                                             |
| --------- | -------------------------------------------------- |
| framework | sveltekit 2                                        |
| language  | javascript (no typescript)                         |
| ui        | skeleton ui v4 + tailwind css v4                   |
| icons     | lucide-svelte                                      |
| pwa       | `@vite-pwa/sveltekit` (workbox sw + auto manifest) |
| build     | vite 8                                             |
| theme     | pine (olive/khaki earth tones)                     |

## pages

| page          | route            | description                                              |
| ------------- | ---------------- | -------------------------------------------------------- |
| Dashboard     | `/`              | stat cards, top 5 artists, top 5 venues, recent shows    |
| Artists       | `/artists`       | card grid of all artists with show counts                |
| Artist Detail | `/artists/[id]`  | artist info, next show banner, show history with pagination |
| Shows         | `/shows`         | searchable/sortable list of attended shows               |
| Show Detail   | `/shows/[id]`    | venue, date, duration, full setlist, notes               |
| Venues        | `/venues`        | card grid of all venues with show counts                 |
| Venue Detail  | `/venues/[slug]` | venue info, next show banner, show history with pagination |
| History       | `/history`       | full table of all attended shows                         |

## reusable components

| component     | props                                | used in                          |
| ------------- | ------------------------------------ | -------------------------------- |
| `PageHeader`  | `title`, `subtitle`                  | all pages                        |
| `BackLink`    | `href`, `label`                      | all detail pages                 |
| `InfoCard`    | `icon`, `label`, `value`, `subtext?` | artist/venue/show detail         |
| `StatCard`    | `icon`, `label`, `value`, `href?`    | dashboard                        |
| `ShowCard`    | `show`, `href?`                      | shows page, ShowList             |
| `ShowList`    | `shows`, `title?`, `emptyText?`      | artist/venue detail              |
| `Setlist`     | `setlist`                            | show detail                      |
| `BannerCard`  | `label`, `title`, `detail?`, `date?` | artist/venue detail (next show)  |
| `EmptyState`  | `message`, `href?`, `linkText?`      | artist/venue/show detail (404)   |
| `RankedList`  | `title`, `items`, `icon?`            | dashboard (top 5 artists/venues) |

## mock data

- **20 attended shows** with full setlists, durations, and notes
- **3 upcoming shows** (Aug-Sept 2026) for Phish, Goose, Billy Strings
- **10 artists** with computed show counts derived from shows data
- **14 unique venues** derived from shows data

## sidebar navigation

Dashboard → Artists → Shows → Venues → History

## next up

- swap mock data for real api (go backend)
- add show editing / adding functionality
- user authentication
- follow artists for notifications
- mobile polish

## backend (not started)

- go + sqlite (modernc.org/sqlite, no cgo) + stdlib net/http
- jambase api client
- tables: artists, shows, show_artists, attendance, follows, metro_cache
