# Astro Monorepo

This monorepo contains multiple packages and sites built with Astro. Each package is designed to work together to create a cohesive development experience.

## Project Structure

```text
/
├── packages/
│   ├── astro/ ## astro based components
│   ├── models/  ## data models like the registration model
│   └── react/ ## react based components, i.e. dynamic form inputs
│   └── sage/ ## libraries for BMF tracking
│   └── utils/ ## random utilities and services
├── sites/
│   └── freewebsitewidget_com ## the website widget for instgram/facebook
│   └── webclass_ai ## the main internal affiliate site
│   └── ultimateaisystem_com ## affiliate version of the main site

```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `.pnpm-helper.sh`         | Helper utility for installing and running PNPM commands
| `./run_webclass.sh`       | Starts webclass dev server at `localhost:4321`   |
| `./run_freewebsitewidget.sh`       | Starts widget dev server at `localhost:4321`   |
| `./run_ultimate.sh`       | Starts ultimate dev server at `localhost:4321`   |

## Deployment Setup

Merge into main will auto deploy.

## Hosting
Sites are hosted on cloudflare pages, when adding a new domain you need to add the cloudflare zone_id to zone_ids.txt.  There is a github hook that clears the cache and puts it in dev mode on deploy since caching is heavy on astro and cloudflare


