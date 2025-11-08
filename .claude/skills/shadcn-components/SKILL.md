---
name: "shadcn-components"
description: "Building shadcn/ui components with Radix UI primitives, CVA variants, accessibility, and MobX integration"
---

# shadcn/ui Component Building Skill

## Quick Start

1. **Always scaffold first** using `#ui_code_tools` plop generators
2. **All shadcn components already installed** at `@/ui/shadcn/ui`
3. **Use `#figma` tool** if given a Figma link
4. **Wrap components in `observer()`** for MobX reactivity

## Technology Stack

- **shadcn/ui** - Component patterns, theming, customization
- **Radix UI** - Primitive components and accessibility
- **TypeScript** - Strict typing with component props
- **Tailwind CSS** - Utility-first styling with design tokens
- **CVA** - Component variant management
- **MobX** - State management (always use `observer()`)

## Component Architecture

### Basic Component Pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { observer } from "mobx-react-lite";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = observer(function Button(rawProps:ButtonProps) {
  const {variant,className,size,...props} = rawProps;
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

```

## Styling Guidelines

### Design Tokens

Use CSS variables for theme-aware styling:

```typescript
// Good - theme-aware
className = "bg-primary text-primary-foreground";
className = "border-border bg-background";
className = "text-muted-foreground";

// Avoid - hard-coded colors
className = "bg-blue-500 text-white";
```

### Focus States & Accessibility

```typescript
// Good - proper focus indicators
className =
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

// Keyboard navigation
className = "focus-visible:outline-none focus-visible:ring-2";
```

## Accessibility Standards

### ARIA Labels & Roles

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  role="button"
  tabIndex={0}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>
```

### Keyboard Navigation

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick?.();
  }
  if (e.key === "Escape") {
    onClose?.();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  aria-label="Action button"
>
  Content
</div>
```

### Screen Reader Support

```typescript
// Hidden visual content with screen reader text
<span className="sr-only">Loading...</span>

// ARIA live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

## shadcn/ui Patterns

### Extending Existing Components

```typescript
import { Button,ButtonProps } from "@/ui/shadcn/ui/button";
import { cn } from "@/lib/utils";

// Extend rather than rebuild
export const IconButton = observer(function IconButtonfunction(rawProps:ButtonProps) {
  const {variant,className,size,...props} = rawProps;
  return (
    <Button
      className={cn("h-10 w-10 p-0", className)}
      {...props}
    >
      {children}
    </Button>
  );
});
```

## Figma Import Best Practices

When importing from Figma:

1. **Remove unnecessary Tailwind classes**:
   - Remove: `font-[Roboto]`, `inline-flex` (use `flex` instead)
   - Keep: Layout/spacing/color classes that affect design

2. **Avoid custom heights/widths**:

   ```typescript
   // Avoid
   className = "h-[347px] w-[892px]";

   // Prefer
   className = "h-full w-full";
   className = "min-h-[200px]"; // Only when necessary
   ```

3. **Use proper flow layout**:

   ```typescript
   // Good - responsive flow
   className = "flex flex-col gap-4";

   // Avoid - fixed dimensions
   className = "h-[500px]";
   ```

## Key Rules

1. **Always use `#ui_code_tools`** to scaffold - never create manually
2. **Wrap with `observer()`** - all components need MobX reactivity
3. **Use CVA for variants** - don't branch in JSX
4. **Extend shadcn components** - don't rebuild from scratch
5. **Use CSS variables** - support theming and dark mode
6. **Follow WCAG 2.1 AA** - implement proper accessibility
7. **Use Radix primitives** - leverage battle-tested components
8. **Implement keyboard navigation** - support all input methods
9. **Add proper ARIA labels** - support screen readers

## Common Pitfalls to Avoid

- ❌ Don't forget `observer()` wrapper
- ❌ Don't use hard-coded colors (use CSS variables)
- ❌ Don't skip accessibility attributes
- ❌ Don't create or install shadcn components (use existing at `@/ui/shadcn/ui`)
- ❌ Don't use inline styles unless absolutely necessary
- ❌ Don't forget proper TypeScript types
- ❌ Don't skip keyboard navigation
- ❌ Don't use custom heights from Figma blindly

## Checklist Before Implementation

- [ ] Scaffolded with `#ui_code_tools`?
- [ ] Wrapped with `observer()`?
- [ ] Using CVA for variants?
- [ ] Using CSS variables for colors?
- [ ] Proper ARIA labels and roles?
- [ ] Keyboard navigation implemented?
- [ ] TypeScript interfaces defined?
- [ ] Extending shadcn components where possible?
- [ ] Proper use of Mobx and not spreading state too early?
