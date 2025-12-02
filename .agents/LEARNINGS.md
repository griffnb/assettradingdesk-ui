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
