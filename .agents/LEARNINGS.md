# Learnings

## V2 Messaging Components - Pattern Mismatch (2025-12-04)

### What I learned
The sub-agents created oversimplified components that don't match the actual pattern from ThreadsList.tsx. The generated components:
1. Don't actually fetch or display data - they're just empty shells
2. Missing critical features like search, pagination, loading states
3. Stories show nothing because components don't render actual content
4. AssetThreadsList and RequestThreadsList are completely different from the ThreadsList.tsx pattern which has:
   - Actual data fetching with service calls
   - Search functionality with debouncing
   - Pagination with PageButtons component
   - Proper loading and empty states
   - Real thread rendering in a map

### How to improve instructions for complex component creation
1. When asking sub-agents to create components "based on" existing ones, provide the FULL file content as context
2. Explicitly state "follow the EXACT pattern" and list specific features to preserve:
   - Data fetching logic
   - Search with debouncing
   - Pagination
   - Loading/empty states
   - Event handlers
3. Require sub-agents to read the reference file FIRST before creating the new component
4. For complex components, break into smaller tasks: first create structure, then add data fetching, then add features
5. ALWAYS verify components actually work in Storybook before considering them complete
6. Don't rely on sub-agents understanding implied patterns - be very explicit about what to copy

## SEO and Meta Tags in Remix/React Router

### What I learned
- Meta tags should NEVER be manipulated via client-side JavaScript (useEffect, document.createElement, etc.) as they won't be seen by search engine crawlers
- In Remix/React Router applications, meta tags must be exported from route files using the `meta` function for proper Server-Side Rendering (SSR)
- JSON-LD structured data should also be included in the meta exports, not embedded in components
- The meta function has access to route data via loaders, allowing dynamic meta tag generation based on actual data
- Type imports from React Router generated types can be incorrect if using the wrong pattern

### How to improve the instructions
Add a section to the repository documentation about SEO best practices:
- Always use route-level meta exports for meta tags, never client-side DOM manipulation
- Include JSON-LD structured data in meta exports using `{ tagName: "script", type: "application/ld+json", children: JSON.stringify(data) }`
- Extract large content blocks into separate components for better maintainability
- Use proper TypeScript types from React Router (MetaFunction, loader return types)

## Server-Side Rendering (SSR) with React Router v7 and MobX

### What I learned
- Routes using `useEffect` to fetch data on mount will not render content during SSR - the HTML will be blank until JavaScript executes
- React Router v7 uses type-safe routing with generated `+types` files for each route
- Proper SSR pattern:
  1. Fetch data in `loader` function using `ServerService.callGet()` (returns plain JSON)
  2. Return plain data objects from loader (not MobX model instances)
  3. In component, hydrate data using `Store.model.load(loaderData)` wrapped in `useState(() => ...)`
  4. Use `Route.LoaderArgs` for loader params typing
  5. Use `Route.ComponentProps` for component props typing with `loaderData`
  6. Use `Route.MetaArgs` with `loaderData` property (not deprecated `data`) for meta function
- The pattern `const [model] = useState(() => Store.model.load(data))` ensures MobX observables are created once and reused
- `ServerService.callGet()` returns raw API data, while `Store.model.query()` returns hydrated MobX models
- For SSR, we need raw data in the loader, then hydrate on client using `Store.load()`

### How to improve the instructions
Add SSR best practices to documentation:
- **Never use `useEffect` for initial data fetching in routes** - it breaks SSR
- Always fetch data in route `loader` functions for SSR
- Use `ServerService.callGet()` in loaders to get raw data
- Hydrate MobX models on client using `useState(() => Store.model.load(loaderData.field))`
- Use React Router v7 type-safe routing: `Route.LoaderArgs`, `Route.ComponentProps`, `Route.MetaArgs`
- In meta functions, use `loaderData` property instead of deprecated `data`

## ReplyBox Component API Design

### What I learned
- The MAIL_CONVERT_TODO.md specified Task 9 requirements for ReplyBox that differ from the existing implementation
- Task 9 requires: internal state management (body, sending), async onSubmit handler, Cmd/Ctrl+Enter keyboard shortcut, auto-clear on success
- The existing ReplyBox used a controlled component pattern with external state (value, onChange, onSend)
- The Task 9 design is simpler for consumers - they just provide an async onSubmit handler and the component manages all state internally
- Auto-resize textarea is achieved with CSS `field-sizing-content` property
- Keyboard shortcuts should be implemented via onKeyDown handler checking for metaKey/ctrlKey + Enter

### How to improve the instructions
Add component API design guidance:
- When building form/input components, consider whether internal or external state management is more appropriate
- For simple submission components (like ReplyBox), internal state with an async onSubmit callback reduces boilerplate for consumers
- For complex forms with validation/multi-step flows, controlled components with external state are better
- Document keyboard shortcuts in component JSDoc comments
- Use CSS field-sizing-content for auto-resizing textareas instead of JavaScript solutions
- Always check existing task specifications (like MAIL_CONVERT_TODO.md) before implementing components
- Components with async operations should manage their own loading state and show appropriate UI feedback

## Utility Functions for Message Components

### What I learned
- The project already uses `dayjs` extensively with the `relativeTime` plugin for date formatting
- The BaseModel has `created_at` typed as `dayjs.Dayjs | null` (not Timestamp objects)
- Existing message components use two patterns for date display:
  - `dayjs(date).format("h:mm A")` for showing clock time
  - `dayjs(date).fromNow()` for relative time (e.g., "2 hours ago")
- The ProductInfo component already had a local `formatPrice` function using Intl.NumberFormat
- The MyAssetMessages component had inline grouping logic that could be extracted to reusable utilities
- Message grouping needs to handle two levels: by asset_id, then by opportunity_id within each asset
- The project follows KISS principle - simple, maintainable utility functions over complex abstractions

### How to improve the instructions
Add utility function creation guidance:
- Always search the codebase first for existing utilities before creating new ones
- Check how similar functionality is currently implemented in components (date formatting, price formatting, etc.)
- Look at the model definitions to understand data types (e.g., BaseModel uses dayjs.Dayjs, not Date)
- Extract commonly used inline logic into utility functions (like message grouping in MyAssetMessages)
- For date formatting, use a hybrid approach: clock time for recent (<24h), relative time for older
- For price formatting, use Intl.NumberFormat with appropriate currency and decimal settings
- For grouping functions, use Map objects for O(1) lookups and clear structure
- Keep utility functions pure and stateless - they should only transform data, not manage state
- Add clear JSDoc comments explaining what each utility does
- Name functions descriptively (formatDateTime, not formatDate) to indicate exactly what format they produce
