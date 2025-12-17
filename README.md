# Waku - A Modern SvelteKit Component Library

[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](LICENSE)

**Waku** is a modern, opinionated SvelteKit component library designed for consistency, performance, and an exceptional developer experience. It features a unique, two-part system for managing depth, a flexible single-accent-color theming engine with automatic text contrast, and a beautiful "Material Glass" design aesthetic.

> **Note**: This library is a personal project intended to create a uniform design system across multiple applications. It is actively developed but tailored to a specific aesthetic.

## Features

- **Dimensional Design System**: Manages depth with a clear distinction between `Surface Elevation` (for layout) and `Overlay Layers` (for UI).
- **"Material Glass" Effect**: A beautiful, subtle glassmorphism effect with frosted edges and gradients for all overlay components.
- **Single Accent Color Theming**: Define one accent color in your project, and Waku generates a complete, perceptually uniform color palette with automatic text contrast for optimal readability.
- **Developer-First API**: Components like `VStack`, `HStack`, and `elevation` props make building complex, consistent layouts trivial.
- **Dark Mode First**: Meticulously designed to look stunning in both light and dark modes.
- **Fully Typed & Accessible**: Built with TypeScript and ARIA best practices.

## Installation

Add Waku to your project's `package.json`. Since it's a private library, it's best installed directly from GitHub.

### Install from a specific tag (recommended)

```json
"devDependencies": {
  "waku": "github:lumisxh/waku#v1.0.0"
}
```

Replace `v1.0.0` with the desired version tag.

### Install from main branch

```json
"devDependencies": {
  "waku": "github:lumisxh/waku"
}
```

This will always use the latest code from the main branch.

## Quick Start

1.  **Import the CSS:** In your app's main CSS file (e.g., `app.css`), import the Waku stylesheet.

    ```css
    /* src/app.css */
    @import 'waku/styles/waku.css';
    ```

2.  **Set Your Accent Color:** In the same file, override the `--waku-accent` variable to theme the entire library.

    ```css
    /* src/app.css */
    @import 'waku/styles/waku.css';

    :root {
    	--waku-accent: oklch(0.65 0.2 250); /* Your project's brand color (e.g., a vibrant blue) */
    }

    /* The accent color can be light or dark - components automatically adapt text color for readability */
    ```

3.  **Use the Components:** Start building your UI with Waku's components.

    ```svelte
    <script>
    	import { Card, VStack, Button } from 'waku';
    </script>

    <Card elevation={2} padding="lg">
    	<VStack gap="md">
    		<h1>Welcome to Waku</h1>
    		<p>This card is automatically styled with an elevated background.</p>
    		<Button variant="primary">Get Started</Button>
    	</VStack>
    </Card>
    ```

## The Waku Design System

Waku is built on a few core principles that make it powerful and easy to use.

### The Two-Part Depth System

Understanding depth is key to using Waku effectively.

#### 1. Surface Elevation

Surface Elevation is for the **static structure of your page**. Use it to create a visual hierarchy in your main layout.

- **Prop:** `elevation={0 | 1 | 2}`
- **Components:** `VStack`, `HStack`, `Card`
- **Effect:** Changes the background color to be subtly brighter, creating a sense of topographical depth. It does **not** apply the glass effect.

**When to use it:**

- A sidebar next to a main content area: `<HStack><VStack elevation={1}>...</VStack></HStack>`
- A card that needs to stand out on a surface: `<Card elevation={2}>...</Card>`

```svelte
<!-- A common page layout -->
<VStack elevation={0} class="page">
	<HStack elevation={1} class="header">...</HStack>
	<Card elevation={2} class="content">
		Your content here. The card is visually on top of the header, which is on top of the page.
	</Card>
</VStack>
```

#### 2. Overlay Layers

Overlay Layers are for **temporary, interactive UI** that appears _on top_ of the page structure.

- **Mechanism:** These components automatically use the "Material Glass" effect, shadows, and high `z-index` values. They do **not** use the `elevation` prop.
- **Components:** `Modal`, `Select` dropdown, `Tooltip`, `Toast`.

**When to use it:**

- Showing a dialog: `<Modal bind:open={...}>`
- Displaying a notification: `toast('Profile updated!')`

The glass effect is the visual cue that tells the user, "This is a temporary layer."

### Button Hierarchy

Waku provides a clear hierarchy of buttons. Use the variant that best matches the importance of the action.

- `primary`: The single, most important action.
- `outline`: The standard secondary action.
- `subtle`: A less prominent action, perfect for "Cancel" or minor choices.
- `ghost`: For tertiary actions with no visual weight, like in toolbars.
- `danger`: For destructive actions only.

### Automatic Text Contrast

Waku automatically ensures text is readable on colored backgrounds. Components like `Button`, `Badge`, and `Alert` automatically switch between black and white text based on the background lightness.

For custom elements, use the opt-in utility classes:

```svelte
<!-- Automatic contrast for accent-500 backgrounds -->
<div class="bg-accent-500 text-auto-contrast">
	Text automatically switches between black/white for readability
</div>

<!-- For specific accent shades -->
<div class="bg-accent-700 text-accent-contrast-700">Text adapts to accent-700 lightness</div>
```

**Available classes:**

- `.text-auto-contrast` - For `bg-accent` or `bg-accent-500`
- `.text-accent-contrast-50` through `.text-accent-contrast-950` - For all accent shades

This works seamlessly with any accent color you choose, whether light or dark!

### Available Components (v1)

A complete showcase is available by running the project locally.

- **Layout:**
  - `VStack`, `HStack`: The workhorses for all layouts. Use them for everything from page structure to small component arrangements.
  - `Separator`: A visual divider.
  - `Card`: The primary container for grouped content.
- **Components:**
  - `Button`, `Input`, `Toggle`, `Select`: Core form and action elements.
  - `Modal`, `Tooltip`, `Toast`: Overlay and notification components.
  - `Badge`, `Alert`, `LoadingSpinner`: Status and feedback indicators.

## Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/waku.git
    cd waku
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the showcase:**
    ```bash
    pnpm dev
    ```
    The component showcase will be available at `http://localhost:5173`.

## Contributing

This is a personal library, but contributions for bug fixes or performance improvements are welcome. Please open an issue to discuss any proposed changes.

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
