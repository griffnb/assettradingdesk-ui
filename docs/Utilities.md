# Utility Toolkit

## Logging & Diagnostics

- Use `debugLog` for any console output; it automatically gates logs to non-production environments or authenticated admins, protecting production consoles from noise (`packages/utils/src/debug.ts:3`).

## Async Helpers

- Reach for the shared `debounce` wrapper when delaying input handlers; it preserves `this`/arguments and supports leading-edge execution (`packages/utils/src/debounce.ts:1`). Tables already use this for search—follow the same pattern for other typeahead flows.

## Collections & Emptiness

- `empty.ts` offers a robust `isEmpty` that safely handles arrays, strings, and proxy objects. Prefer it over ad-hoc `!value?.length` checks (`packages/utils/src/empty.ts:1`).
- `equals` and `inArray` in `numbers.ts` normalize number/string comparisons so status IDs line up regardless of type (`packages/utils/src/numbers.ts:3`).

## Formatting & Math

- `numbers.ts` centralizes number helpers—`formatNumber`, `formatPercent`, `roundToDecimal`, and `weekOfMonth`. Use them to keep formatting identical across components (`packages/utils/src/numbers.ts:19`).
- `time.ts` exposes timezone helpers (`getUserTimezone`, `getTimezoneOffsets`) and friendly date formatting without duplicating Intl logic (`packages/utils/src/time.ts:1`).

## Strings & URLs

- `strings.ts` provides UUID helpers, URL serializing (`getUrlString`), pluralization, hashing, and validation. Lean on these instead of rewriting regex-heavy utilities (`packages/utils/src/strings.ts:1`).
- For query/filter plumbing, `filters/helpers.ts` maps between filter descriptors and query params so table/filter code stays consistent (`packages/utils/src/filters/helpers.ts:1`).

## Environment & Cookies

- Access public env vars through `getPublicEnvVar` to avoid sprinkling `import.meta.env` lookups around the app (`packages/utils/src/env.ts:1`).
- `cookies.ts` offers basic `getCookie`/`setCookie` helpers; SessionService already wraps them, but they’re available for ancillary flows (`packages/utils/src/cookies.ts:1`).

## Dayjs Initialization

- Dayjs plugins (`utc`, `timezone`, etc.) are registered via `utils/init.ts`. Call `init()` early in environments that need the setup (apps already do this implicitly through BaseModel) (`packages/utils/src/init.ts:1`).

## Working Agreements

- Prefer these shared helpers before adding new utilities—if you need to extend, colocate additions under `packages/utils/src` so both apps and UI packages can reuse them.
- Keep new helpers pure and side-effect free; anything environment-dependent (cookies, env, logging) should follow the existing pattern of thin wrappers around browser/Node APIs.
- Document any new utility with a short JSDoc so other contributors know when to reach for it.
