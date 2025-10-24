# Waku

A modern, customizable SvelteKit component library with built-in dark mode support and flexible theming.

## Features

- **Single Accent Color System**: Set one color, get a complete design system
- **Dark Mode Support**: Built-in dark/light mode with automatic styling
- **Tailwind v4 Integration**: Full Tailwind utility class support
- **TypeScript First**: Complete type definitions for all components
- **Accessible**: ARIA-compliant components with keyboard navigation
- **Tree-shakeable**: Import only what you need

## Installation

Since Waku is added as a git dependency:

```bash
# In your package.json
{
  "dependencies": {
    "waku": "github:yourusername/waku#v1.0.0"
  }
}
```

## Quick Start

### 1. Import the CSS

In your app's main CSS file:

```css
/* app.css */
@import '@waku/styles/waku.css';

:root {
	--accent-500: oklch(0.65 0.2 280); /* Your accent color */
}
```

### 2. Use Components

```svelte
<script>
	import { Button } from '@waku/components';
	import { VStack } from '@waku/layout';
	import { clickOutside } from '@waku/actions';
</script>

<VStack gap="md">
	<Button variant="primary">Click Me</Button>
	<Button variant="secondary">Secondary</Button>
</VStack>
```

## Project Structure

```
waku/
├── actions/          # Svelte actions (clickOutside, focusTrap, etc.)
├── components/       # UI components (Button, Input, Modal, etc.)
├── layout/           # Layout components (VStack, HStack, Card, etc.)
├── types/            # Shared TypeScript types
├── showcase/         # Component showcase/documentation
└── index.ts          # Root exports
```

## Import Paths

```typescript
// Root import (all exports)
import { Button } from '@waku';

// Specific imports
import { Button, Input } from '@waku/components';
import { VStack, HStack } from '@waku/layout';
import { clickOutside, focusTrap } from '@waku/actions';
import type { ButtonProps, Variant, Size } from '@waku/types';
```

## Dark Mode

Toggle dark mode by adding the `dark` class to your root element:

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

All components automatically adapt to dark mode.

## Available Components

### Components

- **Button** - Interactive button with variants and sizes
- **Input** - Text and number inputs
- **Toggle** - Switch/toggle component
- **Modal** - Accessible modal dialogs
- **Select** - Dropdown select component
- **Tooltip** - Hover tooltips
- **Tabs** - Tabbed interface
- **Badge** - Status badges
- **LoadingSpinner** - Loading indicator
- **Toast** - Toast notifications
- **Alert** - Alert messages

### Layout

- **VStack** - Vertical stack container
- **HStack** - Horizontal stack container
- **Separator** - Visual divider
- **Card** - Content card

### Actions

- **clickOutside** - Detect clicks outside an element
- **portalled** - Move elements to a different parent
- **focusTrap** - Trap focus within an element
- **trapScroll** - Prevent body scrolling
- **autoFocus** - Auto-focus elements

## Component Props

All components follow consistent naming patterns:

- `variant` - Visual style ('primary', 'secondary', 'ghost', 'outline', 'danger')
- `size` - Size ('sm', 'md', 'lg')
- `disabled` - Disabled state
- Component-specific props as needed

Example:

```svelte
<Button variant="primary" size="lg" disabled={false} onclick={() => console.log('clicked')}>
	Click Me
</Button>
```

## Theming

### Accent Color

Set your accent color in CSS:

```css
:root {
	--accent-500: oklch(0.65 0.2 280);
}
```

Or use the JavaScript utility:

```typescript
import { setAccentColor } from '@waku/styles';

setAccentColor('hsl(280, 85%, 60%)');
// or
setAccentColor('oklch(0.65 0.2 280)');
```

### Available Colors

- **Accent Scale**: `accent-50` through `accent-950`
- **Neutral Scale**: `neutral-50` through `neutral-950`
- **Feedback**: `success`, `warning`, `danger`, `info`

Use in Tailwind classes:

```svelte
<div class="bg-accent-500 hover:bg-accent-600 text-white">Styled element</div>
```

## Development

Run the showcase to see all components:

```bash
npm run dev
```

The showcase is available in the `showcase/` directory and demonstrates all components with different variants and states.

## TypeScript

All components export their prop types:

```typescript
import type { ButtonProps } from '@waku/components';
import type { Variant, Size } from '@waku/types';

// Use in your own components
interface MyButtonWrapperProps extends ButtonProps {
	customProp: string;
}
```

## Contributing

Waku is a personal component library. If you want to use it:

1. Fork the repository
2. Customize the accent color and design tokens
3. Add your own components as needed

## License

BSD 3-Clause License
