# Adding a New Component

Follow the patterns in `components/ui/*` and keep code TypeScript‑strict.

## Guidelines

- Location: `components/ui/MyComponent.tsx` for reusable primitives.
- Naming: PascalCase component names; file names in kebab/camel case.
- Server components by default; add `"use client"` if you use state, effects, refs, or browser APIs.
- Styling: Tailwind CSS v4. Compose classes with `cn` from `lib/utils.ts`.
- Variants: Prefer `class-variance-authority` (`cva`) for variantable components.
- Types: Avoid `any`. Export component and any variant helpers.

## Minimal Example (server component)

```tsx
// components/ui/section.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

type SectionProps = React.HTMLAttributes<HTMLDivElement>

export function Section({ className, ...props }: SectionProps) {
  return (
    <section className={cn("py-6", className)} {...props} />
  )
}
```

## Variant Example (client with cva)

```tsx
// components/ui/alert.tsx
"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "rounded-md border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/20 dark:text-blue-50",
        success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/20 dark:text-green-50",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-50",
        destructive: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/20 dark:text-red-50",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props} />
  )
}

export { alertVariants }
```

## Using the Component

Import with the path alias and compose classes with `cn` if needed:

```tsx
import { Alert } from "@/components/ui/alert"

export default function Example() {
  return <Alert variant="success">Saved successfully</Alert>
}
```

## Review Checklist

- Types are explicit; no `any`.
- Uses `cn` for class composition.
- Client/server boundary is correct (`"use client"` only when needed).
- Follows existing folder and naming conventions.
- Lint passes: `npm run lint`.

