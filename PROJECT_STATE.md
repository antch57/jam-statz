# jam-statz — project state

## structure

jam-statz/
├── package.json
├── svelte.config.js       # adapter-auto
├── vite.config.js          # sveltekit + @vite-pwa/sveltekit
├── src/
│   ├── app.html            # html shell
│   └── routes/
│       ├── +layout.svelte  # manifest link + sw registration
│       └── +page.svelte    # hello world
├── static/
│   └── icon.svg            # app icon
├── .prettierrc
├── .prettierignore
├── .gitignore
├── README.md
└── PROJECT_STATE.md

## frontend

| layer | choice |
|---|---|
| framework | sveltekit |
| language | javascript |
| ui | svelte |
| pwa | `@vite-pwa/sveltekit` (workbox sw + auto manifest) |
| build | vite |

## backend (not started)

- go + sqlite (modernc.org/sqlite, no cgo) + stdlib net/http
- jambase api client
- tables: artists, shows, show_artists, attendance, follows, metro_cache

## next up

- build out pages (dashboard, artists, show search, history)
- static mock data first, swap to real api later
- scaffold backend
