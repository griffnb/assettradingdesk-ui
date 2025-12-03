# Learnings

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
- Pattern for each route:
  ```typescript
  // Loader - fetch raw data
  export async function loader({ params }: Route.LoaderArgs) {
    const resp = await ServerService.callGet("model", "", { slug: params.slug });
    return data({ model: resp.data });
  }

  // Meta - use loaderData
  export const meta = ({ loaderData }: Route.MetaArgs) => {
    return [{ title: loaderData.model.name }];
  };

  // Component - hydrate MobX models
  export default observer(({ loaderData }: Route.ComponentProps) => {
    const [model] = useState(() => Store.model.load(loaderData.model));
    return <Component model={model} />;
  });
  ```
