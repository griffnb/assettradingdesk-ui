# Styling Guidelines

## When Creating New Components

1. Start with `#ui-code-tools` scaffold so `cva`, `data-slot`, and Tailwind patterns are pre-wired.
2. Define base styles via `cva`, expose variant props sparingly, and merge user classes with `cn`.
3. Provide `data-slot` attributes around key regions to keep overrides consistent.
4. Keep utility strings readable—split long class lists across lines/arrays if needed for clarity.

## Tailwind First

- Stick to Tailwind utility classes for layout, color, and spacing—no inline styles unless there is no Tailwind equivalent
- Respect the existing z-index scale (`popover`, `modal`, etc.) when layering components to avoid ad-hoc values (`tailwind.config.js:10`).

## `cva` + `cn` Pattern

- Define component styling with `cva` so variants and defaults are co-located
- Merge classes with the shared `cn` helper (clsx + tailwind-merge) to automatically dedupe conflicting utilities
- When you need conditional classes outside `cva`, use `cn([base, condition && modifier])` rather than nested template literals

## State & Variant Organization

- Group related state classes together so hover/checked/disabled logic is easy to scan (see the button variants for an example of clustered state modifiers

```ts
primary: [
          "bg-fg-brand-primary text-text-neutral-white",
          "border border-transparent",
          "hover:bg-fg-brand-secondary",
          "disabled:border disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
        ],
```

- Prefer variant props to boolean props; add new `cva` variants instead of branching inside JSX whenever a style difference is predictable.
- Keep class arrays small; when state handling grows complex, extract a helper instead of chaining more than ~3 `.map/.filter` calls per prior instructions.

## Data Slots & Overrides

- Expose `data-slot` hooks for downstream overrides instead of allowing arbitrary class injection everywhere
- When you expect consumers to extend styling, add targeted `className` props that layer onto a `cva` variant rather than replacing the whole definition.

## Layout & Spacing

- Favor flex/grid utilities with `gap` over manual margins between siblings; it keeps spacing consisent and easier to adjust
- Align content using consistent padding scales (e.g., `px-3`, `py-2.5`) similar to existing components so typography remains on grid
- For scroll containers, apply height via Tailwind calc with CSS variables (as seen on table wrap) instead of `style={{ height: … }}` to respect theme knobs, you can use the hook `useMeasureVariable.ts` to auto calculate and manage it
