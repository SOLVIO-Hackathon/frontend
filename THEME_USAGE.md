# Theme System Documentation

## Overview

The ZeroBin frontend now features a **role-based dynamic theming system** that automatically changes colors throughout the application based on the logged-in user's role.

## Color Schemes

| User Role   | Primary Color | Secondary Color | Use Case                    |
|-------------|---------------|-----------------|------------------------------|
| CITIZEN     | Green         | Emerald/Teal    | Default users                |
| ADMIN       | Red           | Rose/Pink       | Administrators               |
| KABADIWALA  | Blue          | Sky/Cyan        | Scrap dealers                |
| COLLECTOR   | Orange        | Amber/Yellow    | Waste collectors             |

## Architecture

### 1. Theme Provider (`src/context/ThemeContext.tsx`)
The `ThemeProvider` wraps the entire app and provides theme colors based on the authenticated user's role.

### 2. Dynamic Background (`src/components/DynamicBackground.tsx`)
Automatically applies role-based background gradients and animated blobs across all pages.

### 3. Theme Utilities (`src/lib/themeUtils.ts`)
Contains color definitions and helper functions for all user roles.

## Usage in Components

### Option 1: Using the `useTheme` Hook (Recommended)

```tsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export default function MyComponent() {
  const { themeColors } = useTheme();

  return (
    <div className={`p-4 ${themeColors.bgLight}`}>
      <h1 className={themeColors.text}>Welcome</h1>
      <button className={`px-4 py-2 bg-linear-to-r ${themeColors.gradient} text-white`}>
        Click Me
      </button>
    </div>
  );
}
```

### Option 2: Using the ThemeButton Component

```tsx
import ThemeButton from "@/components/ThemeButton";

export default function MyPage() {
  return (
    <div>
      <ThemeButton variant="primary" size="md">
        Primary Action
      </ThemeButton>

      <ThemeButton variant="secondary" size="sm">
        Secondary Action
      </ThemeButton>

      <ThemeButton variant="outline" size="lg">
        Outlined Button
      </ThemeButton>
    </div>
  );
}
```

## Available Theme Colors

The `themeColors` object from `useTheme()` provides:

```typescript
{
  primary: string;           // "green" | "red" | "blue" | "orange"
  primaryHex: string;        // Hex color code
  primaryLight: string;      // Lighter variant
  gradient: string;          // Tailwind gradient classes
  gradientHover: string;     // Hover gradient classes
  bg: string;                // Background utility class
  bgHover: string;           // Background hover class
  text: string;              // Text color class
  textHover: string;         // Text hover class
  border: string;            // Border color class
  bgLight: string;           // Light background class
  bgGradient: string;        // Full gradient for backgrounds
  bgGradientCard: string;    // Card gradient
  blobColors: string[];      // Array of blob colors for animations
}
```

## Examples

### Button with Dynamic Colors
```tsx
<button className={`px-6 py-3 bg-linear-to-r ${themeColors.gradient} text-white rounded-lg hover:shadow-xl`}>
  Submit
</button>
```

### Card with Theme Border
```tsx
<div className={`p-6 rounded-xl border-2 ${themeColors.border} bg-white`}>
  <h2 className={themeColors.text}>Card Title</h2>
  <p className="text-slate-600">Card content</p>
</div>
```

### Link with Hover Effect
```tsx
<Link href="/dashboard" className={`hover:${themeColors.text} transition-colors`}>
  Go to Dashboard
</Link>
```

### Icon with Theme Color
```tsx
import { Leaf } from "lucide-react";

<Leaf className={`w-6 h-6 ${themeColors.text}`} />
```

## Global Application

The theme system is automatically applied globally through:

1. **Layout** - `src/app/layout.tsx` wraps everything with `ThemeProvider`
2. **Background** - `DynamicBackground` component handles all page backgrounds
3. **Navbar** - Already updated to use dynamic colors
4. **Landing Page** - Fully themed with role-based colors

## Adding Theme Support to New Pages

For any new page, simply use the `useTheme` hook:

```tsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export default function NewPage() {
  const { themeColors } = useTheme();

  return (
    <div className="container mx-auto p-6">
      <h1 className={`text-4xl font-bold ${themeColors.text} mb-6`}>
        Page Title
      </h1>

      <div className={`p-8 rounded-xl bg-linear-to-br ${themeColors.bgGradientCard} border ${themeColors.border}`}>
        {/* Your content */}
      </div>
    </div>
  );
}
```

## CSS Variables

For advanced styling, CSS variables are also available:

```css
var(--theme-primary)      /* Primary color hex */
var(--theme-primary-hex)  /* Primary color hex */
```

These are automatically updated based on the `data-user-role` attribute on the body element.

## Best Practices

1. ✅ **DO** use `useTheme()` hook for dynamic colors
2. ✅ **DO** use the `ThemeButton` component for consistent buttons
3. ✅ **DO** apply theme colors to primary UI elements (headings, buttons, icons)
4. ✅ **DO** keep neutral colors (slate, gray) for body text and backgrounds
5. ❌ **DON'T** hardcode color values like "green-600" for primary elements
6. ❌ **DON'T** mix theme colors with non-theme colors inconsistently

## Migration Guide

To update an existing page to use the theme system:

1. Import the hook: `import { useTheme } from "@/context/ThemeContext";`
2. Get theme colors: `const { themeColors } = useTheme();`
3. Replace hardcoded green colors:
   - `text-green-600` → `{themeColors.text}`
   - `bg-green-600` → `{themeColors.bg}`
   - `from-green-600 to-emerald-600` → `{themeColors.gradient}`
   - `border-green-200` → `{themeColors.border}`

## Support

If you need additional color utilities or have questions about the theme system, refer to:
- `src/lib/themeUtils.ts` - Theme definitions
- `src/context/ThemeContext.tsx` - Theme context provider
- `src/components/DynamicBackground.tsx` - Background component
