/**
 * Waku Theme Context
 * Provides depth tracking and accent color customization via Svelte context
 */

import { getContext, setContext } from 'svelte';

/**
 * Depth levels for the visual hierarchy
 * 0: Page background
 * 1: Primary content (cards, sections)
 * 2: Elevated content (focused cards, sidebars)
 * 3: Floating UI (dropdowns, selects) - starts using glass
 * 4: Overlays (modals, sheets) - heavier glass
 * 5: System overlays (toasts, tooltips) - heaviest glass
 */
export type Depth = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Theme context shape
 */
export interface ThemeContext {
	/**
	 * Current depth level in the component hierarchy
	 */
	depth: Depth;

	/**
	 * Accent color in OKLCH format
	 */
	accent: string;

	/**
	 * Whether interactive glass effects are globally enabled
	 */
	interactiveGlass: boolean;

	/**
	 * Whether reduced motion is preferred
	 */
	reducedMotion: boolean;

	/**
	 * Increment depth by 1 (max: 5)
	 */
	incrementDepth: () => Depth;

	/**
	 * Set a specific depth level
	 */
	setDepth: (depth: Depth) => void;

	/**
	 * Reset depth to a specific level
	 */
	resetDepth: (depth: Depth) => Depth;

	/**
	 * Update accent color
	 */
	setAccent: (color: string) => void;
}

const THEME_CONTEXT_KEY = Symbol('waku-theme');

/**
 * Create and set the root theme context
 */
export function createThemeContext(options: {
	accent?: string;
	interactiveGlass?: boolean;
	reducedMotion?: boolean;
}): ThemeContext {
	let currentDepth = $state<Depth>(0);
	let currentAccent = $state(options.accent || 'oklch(0.65 0.2 250)');

	const context: ThemeContext = {
		get depth() {
			return currentDepth;
		},
		get accent() {
			return currentAccent;
		},
		interactiveGlass: options.interactiveGlass ?? true,
		reducedMotion: options.reducedMotion ?? false,

		incrementDepth: () => {
			const newDepth = Math.min(5, currentDepth + 1) as Depth;
			currentDepth = newDepth;
			return newDepth;
		},

		setDepth: (depth: Depth) => {
			currentDepth = depth;
		},

		resetDepth: (depth: Depth) => {
			currentDepth = depth;
			return depth;
		},

		setAccent: (color: string) => {
			currentAccent = color;
			// Update CSS variable
			if (typeof document !== 'undefined') {
				document.documentElement.style.setProperty('--waku-accent', color);
			}
		}
	};

	setContext(THEME_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the current theme context
 * If no context exists, returns a default context
 */
export function getThemeContext(): ThemeContext {
	const context = getContext<ThemeContext | undefined>(THEME_CONTEXT_KEY);

	if (!context) {
		// Return default context when outside ThemeProvider
		return {
			depth: 0,
			accent: 'oklch(0.65 0.2 250)',
			interactiveGlass: true,
			reducedMotion: false,
			incrementDepth: () => 0,
			setDepth: () => {},
			resetDepth: (depth) => depth,
			setAccent: () => {}
		};
	}

	return context;
}

/**
 * Create a nested depth context (increments depth by 1)
 */
export function createNestedDepthContext(): ThemeContext {
	const parent = getThemeContext();
	const newDepth = Math.min(5, parent.depth + 1) as Depth;

	const nestedContext: ThemeContext = {
		get depth() {
			return newDepth;
		},
		get accent() {
			return parent.accent;
		},
		interactiveGlass: parent.interactiveGlass,
		reducedMotion: parent.reducedMotion,

		incrementDepth: () => {
			return Math.min(5, newDepth + 1) as Depth;
		},

		setDepth: (depth: Depth) => {
			// Nested contexts don't modify depth directly
			parent.setDepth(depth);
		},

		resetDepth: (depth: Depth) => {
			return parent.resetDepth(depth);
		},

		setAccent: (color: string) => {
			parent.setAccent(color);
		}
	};

	setContext(THEME_CONTEXT_KEY, nestedContext);
	return nestedContext;
}

/**
 * Helper to determine if glass effect should be used at current depth
 */
export function shouldUseGlass(depth: Depth): boolean {
	return depth >= 3;
}

/**
 * Get the appropriate glass class for the current depth
 */
export function getGlassClass(depth: Depth): string {
	switch (depth) {
		case 0:
		case 1:
		case 2:
			return '';
		case 3:
			return 'glass-thin';
		case 4:
			return 'glass-thick';
		case 5:
			return 'glass-heavy';
		default:
			return '';
	}
}

/**
 * Get the appropriate elevation class for the current depth
 */
export function getElevationClass(depth: Depth): string {
	if (depth >= 3) return ''; // Use glass instead
	return `elevation-${depth}`;
}

/**
 * Get surface background color for current depth
 */
export function getSurfaceColor(depth: Depth): string {
	if (depth >= 3) return 'transparent';
	return `var(--waku-surface-${Math.min(2, depth)})`;
}

/**
 * Get shadow for current depth
 */
export function getShadow(depth: Depth): string {
	const shadows = {
		0: 'none',
		1: 'var(--shadow-sm)',
		2: 'var(--shadow-md)',
		3: 'var(--shadow-lg)',
		4: 'var(--shadow-xl)',
		5: 'var(--shadow-2xl)'
	};
	return shadows[depth] || 'none';
}
