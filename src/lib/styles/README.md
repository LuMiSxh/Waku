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
<div class="bg-accent-500 text-white hover:bg-accent-600">Primary Button</div>
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

## Interactive Glass Effects

Waku includes an advanced glass morphism system with dynamic, interactive effects inspired by iOS/macOS Liquid Glass. The highlights, speckles, and edge lighting respond to cursor movement, scrolling, and hover states.

### Glass Variants

```css
/* Available glass classes */
.glass              /* Standard glass (40px blur) */
.glass-heavy        /* Heavy blur with mesh gradients (60px blur) */
.glass-subtle       /* Subtle glass for small UI (20px blur) */
.glass-ultra-thin   /* Minimal blur for toolbars (20px blur) */
.glass-thin         /* Light glass for dropdowns (30px blur) */
.glass-thick        /* Thick glass for modals (80px blur) */
.glass-tinted       /* Accent-colored glass */
```

### Basic Usage

Simply apply a glass class to any element:

```svelte
<div class="glass p-6 rounded-lg">
  <h2>Glass Card</h2>
  <p>Content with beautiful glass effect</p>
</div>
```

### Interactive Glass (Advanced)

For dynamic, reactive glass effects, use the interactive glass actions:

```svelte
<script>
  import { interactiveGlass, premiumGlass, cursorGlow, scrollGlass } from 'waku/actions';
</script>

<!-- Full-featured interactive glass -->
<div use:premiumGlass class="glass">
  Cursor tracking, scroll animation, floating speckles, and hover glow
</div>

<!-- Cursor glow only -->
<div use:cursorGlow class="glass-heavy">
  Highlights follow your cursor
</div>

<!-- Scroll-reactive only -->
<div use:scrollGlass class="glass">
  Specular highlights rotate as you scroll
</div>

<!-- Custom configuration -->
<div
  use:interactiveGlass={{
    enableCursor: true,
    enableScroll: true,
    enableSpeckles: true,
    intensity: 1.5,
    speed: 0.2
  }}
  class="glass-thick"
>
  Customized interactive glass
</div>
```

### Interactive Glass Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableCursor` | `boolean` | `true` | Track cursor for dynamic glow effect |
| `enableScroll` | `boolean` | `true` | Rotate highlights on scroll |
| `enableHoverGlow` | `boolean` | `true` | Pulsing glow on hover |
| `enableSpeckles` | `boolean` | `true` | Floating light particles |
| `intensity` | `number` | `1` | Effect strength (0-2) |
| `speed` | `number` | `0.15` | Highlight movement speed (0-1) |

### How It Works

The interactive glass system uses:

1. **Cursor Tracking**: Creates a radial gradient that follows your mouse
2. **Scroll Animation**: Rotates the specular highlights based on scroll position
3. **Floating Speckles**: 3 animated light particles that move independently
4. **Edge Glow**: Reactive border highlights that intensify on hover
5. **Mesh Gradients**: Subtle accent-colored gradients (iOS 18+ style)
6. **Noise Texture**: Adds realism to the glass surface

All effects are GPU-accelerated using CSS custom properties updated via `requestAnimationFrame`.

### Glass Effect Anatomy

Each glass effect consists of multiple layers:

```css
/* Layer composition (bottom to top) */
1. Mesh gradient (accent-colored radial gradients)
2. Noise texture (fractal noise for realism)
3. Specular highlights (rotating reflection)
4. Base gradient (translucent color)
5. Edge glow (reactive border highlight)
6. Cursor glow (follows mouse, mix-blend-mode: screen)
7. Floating speckles (animated light particles)
```

### Performance Considerations

- Interactive glass uses `requestAnimationFrame` for smooth 60fps animations
- All effects are CSS-based (no canvas or WebGL)
- GPU-accelerated via `backdrop-filter` and `transform`
- Speckles and cursor tracking pause when element is not visible
- Cleanup happens automatically when components unmount

### Examples

**Modal with interactive glass:**
```svelte
<script>
  import { premiumGlass } from 'waku/actions';
</script>

<div class="modal-backdrop">
  <div use:premiumGlass class="glass-thick modal-content">
    <h2>Modal Title</h2>
    <p>Interactive glass modal with all effects enabled</p>
  </div>
</div>
```

**Toolbar with subtle glass:**
```svelte
<nav use:scrollGlass class="glass-ultra-thin">
  <div class="nav-content">
    Menu items
  </div>
</nav>
```

**Tinted call-to-action:**
```svelte
<div use:cursorGlow class="glass-tinted">
  <h2>Special Offer</h2>
  <p>Accent-colored glass with cursor glow</p>
  <button>Learn More</button>
</div>
```

### CSS Custom Properties

You can customize glass appearance globally:

```css
:root {
  /* Blur amounts */
  --waku-glass-blur: 40px;
  --waku-glass-blur-heavy: 60px;

  /* Vibrancy */
  --waku-glass-saturation: 180%;
  --waku-glass-brightness: 105%;

  /* Edge styling */
  --waku-glass-edge: oklch(1 0 0 / 0.8);

  /* Background gradients */
  --waku-glass-gradient-from: oklch(0.98 0 0 / 0.72);
  --waku-glass-gradient-to: oklch(0.96 0 0 / 0.58);
}
```

### Browser Support

- ✅ Chrome/Edge 76+ (full support)
- ✅ Safari 9+ (full support, `-webkit-backdrop-filter`)
- ⚠️ Firefox 103+ (backdrop-filter behind flag)
- ❌ IE11 (graceful degradation to translucent background)

For maximum compatibility, glass effects include fallbacks:
- Translucent backgrounds when `backdrop-filter` is unavailable
- Static highlights when JavaScript is disabled
- Reduced motion respects `prefers-reduced-motion`
