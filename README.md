# jam statz

ive tried many times before and here we are again..

goal is to create a one stop shop to track the shows you have been to as well as upcoming shows from bands..

## frontend tech stack

| layer     | choice                |
| --------- | --------------------- |
| framework | sveltekit             |
| language  | javascript            |
| ui        | svelte                |
| pwa       | `@vite-pwa/sveltekit` |
| build     | vite                  |

## backend tech stack

> [!warning]
> no clue what this will end up looking like...
>
> i just know i want the backend to be written in go because thats what im practicing

| layer    | choice |
| -------- | ------ |
| language | go     |

## deployment

> **step one: self-host on a raspberry pi 3b+** to get it live and cheap ($0/mo + electricity)

| piece      | how                                      |
| ---------- | ---------------------------------------- |
| host       | raspberry pi 3b+ running at home         |
| frontend   | built on dev machine (`adapter-node`)    |
| backend    | cross-compiled go binary (`GOARM=7`)     |
| db         | sqlite file on the pi (backed up)        |
| internet   | cloudflare tunnel (free https + no open ports) |

- pi = always-on server, dev machine = build box, cloudflare tunnel = front door
- needs `adapter-node` (swap out `adapter-auto`) before deploying
- later steps may revisit: managed platforms or a small vps if the pi becomes limiting
