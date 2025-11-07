---
name: "styling-patterns"
description: "Tailwind CSS styling with CVA variants, data-slots, layout patterns, and z-index management"
---

# Styling Patterns Skill

## Quick Start

1. **Always** start with `#ui-code-tools` scaffold for proper `cva` and `data-slot` setup
2. Use Tailwind utilities - NO inline styles unless no Tailwind equivalent exists
3. Merge classes with `cn()` helper (clsx + tailwind-merge)

## Core Pattern: cva + cn

```typescript
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: [
          "bg-fg-brand-primary text-text-neutral-white",
          "border border-transparent",
          "hover:bg-fg-brand-secondary",
          "disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
        ],
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    }
  }
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

## State & Variant Organization

Group related state classes together:

```typescript
primary: [
  "bg-fg-brand-primary text-text-neutral-white",
  "border border-transparent",
  "hover:bg-fg-brand-secondary",
  "disabled:border disabled:border-border-neutral-disabled_subtle disabled:text-text-neutral-quinary-disabled disabled:bg-fg-neutral-disabled",
],
```

- Prefer variant props over boolean props
- Add new `cva` variants instead of JSX branching
- Keep arrays small - extract helpers if state logic gets complex

## Data Slots for Overrides

Expose `data-slot` attributes for targeted styling:

```typescript
<div data-slot="table-wrapper">
  <table data-slot="table">
    <thead data-slot="thead">
      {/* ... */}
    </thead>
  </table>
</div>
```

Allow consumers to override specific parts:

```typescript
// Parent can now do:
<Table className="[&_*[data-slot='thead']]:bg-red-500" />
```

## Layout Best Practices

### Spacing
- Use `gap` over manual margins between siblings:
  ```typescript
  // Good
  <div className="flex gap-4">
    <Item />
    <Item />
  </div>

  // Avoid
  <div className="flex">
    <Item className="mr-4" />
    <Item />
  </div>
  ```

### Padding & Alignment
- Use consistent padding scales: `px-3`, `py-2.5`
- Keep typography on grid with standard scales

### Heights for Scroll Containers
- Use Tailwind calc with CSS variables
- Use `useMeasureVariable` hook for auto-calculated heights
- Avoid inline `style={{ height: ... }}`

```typescript
const containerRef = useMeasureVariable("container-height");

<div
  ref={containerRef}
  className="h-[calc(100vh-var(--container-height))] overflow-auto"
>
  {/* scrollable content */}
</div>
```

## Z-Index Scale

Respect the existing z-index scale to avoid conflicts:

```javascript
// tailwind.config.js
zIndex: {
  dropdown: "100",
  sticky: "200",
  popover: "300",
  tooltip: "400",
  modal: "500",
  notification: "600",
}
```

## Conditional Classes

```typescript
// With cva (preferred)
const cardVariants = cva("rounded-lg", {
  variants: {
    elevated: {
      true: "shadow-lg",
      false: "border",
    }
  }
});

// Outside cva
className={cn([
  "base-classes",
  condition && "conditional-classes",
  anotherCondition ? "yes-classes" : "no-classes"
])}
```

## Key Rules

1. **Tailwind first** - only use inline styles when necessary
2. **Define variants in cva** - avoid branching in JSX
3. **Use cn() to merge** - handles conflicts automatically
4. **Provide data-slots** - for targeted overrides
5. **Favor flex/grid + gap** - over manual spacing
6. **Keep class arrays readable** - split long lists across lines
7. **Follow existing patterns** - check similar components first
