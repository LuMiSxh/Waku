# Waku Styling System

## Setup

Import Waku's CSS in your app's main CSS file:

```css
/* app.css */
@import '@waku/styles/waku.css';

/* Override the accent color for your app */
:root {
	--accent-500: oklch(0.65 0.2 280); /* Purple accent */
}
```

## Using HSL Colors

If you prefer to work with HSL colors, you have two options:

### Option 1: CSS (Modern browsers)

```css
:root {
	--accent-500: hsl(280 85% 60%);
}
```

Modern browsers will handle this automatically through CSS color conversion.

### Option 2: JavaScript Utility

```typescript
import { setAccentColor } from '@waku/styles/colors';

// During app initialization
setAccentColor('hsl(280, 85%, 60%)');
// or
setAccentColor('280 85% 60%');
// or use OKLCH directly
setAccentColor('oklch(0.65 0.2 280)');
```

## Available Color Scales

Waku automatically generates a full color scale from your accent color:

- `accent-50` - Lightest
- `accent-100`
- `accent-200`
- `accent-300`
- `accent-400`
- `accent-500` - Base color (what you set)
- `accent-600`
- `accent-700`
- `accent-800`
- `accent-900`
- `accent-950` - Darkest

Use these in Tailwind classes:

```svelte
<div class="bg-accent-500 hover:bg-accent-600 text-white">Primary Button</div>
```

## Neutral Colors

Waku provides a neutral color scale (50-950) for backgrounds, borders, and text:

```svelte
<div class="border border-neutral-300 bg-neutral-100 text-neutral-900">Card content</div>
```

## Feedback Colors

Pre-defined colors for common UI states:

- `success` - Green for success states
- `warning` - Yellow/orange for warnings
- `danger` - Red for errors/destructive actions
- `info` - Blue for informational messages

```svelte
<div class="text-danger">Error message</div>
<div class="bg-success text-white">Success notification</div>
```

## Design Tokens

### Border Radius

- `radius-sm` - 0.25rem
- `radius-md` - 0.375rem
- `radius-lg` - 0.5rem
- `radius-xl` - 0.75rem

### Shadows

- `shadow-sm`
- `shadow-md`
- `shadow-lg`
- `shadow-xl`

### Transitions

- `transition-fast` - 150ms
- `transition-base` - 200ms
- `transition-slow` - 300ms

### Z-Index Layers

- `z-dropdown` - 1000
- `z-sticky` - 1020
- `z-fixed` - 1030
- `z-modal-backdrop` - 1040
- `z-modal` - 1050
- `z-popover` - 1060
- `z-tooltip` - 1070
- `z-toast` - 1080

## Using Tokens in Components

```svelte
<div style="border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
	Custom styled element
</div>
```

Or with Tailwind (once configured):

```svelte
<div class="rounded-md shadow-md">Element with design tokens</div>
```

## Full Example

```css
/* app.css */
@import '@waku/styles/waku.css';

:root {
	/* Set your app's accent color */
	--accent-500: oklch(0.6 0.2 150); /* Green */

	/* Optionally override other tokens */
	--radius-md: 0.5rem; /* Make default radius slightly larger */
}
```

```svelte
<!-- App.svelte -->
<script>
	import { Button } from '@waku/components';
</script>

<div class="min-h-screen bg-neutral-50 p-4">
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h1 class="mb-4 text-2xl text-neutral-900">Welcome</h1>
		<Button variant="primary">Get Started</Button>
	</div>
</div>
```

## Color Conversion Reference

When setting colors, you can use:

**OKLCH** (recommended for consistency):

- Format: `oklch(L C H)`
- L: Lightness (0-1)
- C: Chroma (0-0.4 typically)
- H: Hue (0-360)

**HSL** (familiar, auto-converted):

- Format: `hsl(H S% L%)` or `H S% L%`
- H: Hue (0-360)
- S: Saturation (0-100%)
- L: Lightness (0-100%)

The generated color scale will be perceptually uniform regardless of input format.
