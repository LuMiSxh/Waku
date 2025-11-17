<script lang="ts">
	import type { Elevation } from '$lib/types/index.js';
	import type { Snippet } from 'svelte';
	import {
		getThemeContext,
		shouldUseGlass,
		getGlassClass,
		getElevationClass
	} from '$lib/context/theme.svelte.js';
	import { interactiveGlass } from '$lib/actions/index.js';

	interface Props {
		children: Snippet;
		/**
		 * Manual elevation override (0-2)
		 * If not provided, auto-detects from depth context
		 */
		elevation?: Elevation;
		/**
		 * Additional class names
		 */
		class?: string;
		/**
		 * Padding size
		 * @default 'md'
		 */
		padding?: 'sm' | 'md' | 'lg' | 'none';
		/**
		 * Force glass effect regardless of depth
		 */
		glass?: boolean;
		/**
		 * Disable interactive glass effects
		 */
		static?: boolean;
	}

	let {
		children,
		class: className,
		padding = 'md',
		elevation,
		glass = false,
		static: isStatic = false
	}: Props = $props();

	const theme = getThemeContext();

	const paddingMap = {
		none: 'p-0',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	// Auto-detect styling based on depth
	const useGlass = $derived(glass || shouldUseGlass(theme.depth));
	const glassClass = $derived(useGlass ? getGlassClass(theme.depth) : '');
	const elevationClass = $derived(
		!useGlass && elevation !== undefined ? `elevation-${elevation}` : ''
	);
	const autoElevationClass = $derived(!useGlass && !elevation ? getElevationClass(theme.depth) : '');

	const finalClass = $derived(
		`card ${glassClass} ${elevationClass} ${autoElevationClass} ${paddingMap[padding]} ${className || ''}`
	);

	// Enable interactive glass if:
	// 1. Glass is being used
	// 2. Interactive glass is enabled globally
	// 3. Not explicitly static
	const enableInteractive = $derived(
		useGlass && theme.interactiveGlass && !isStatic && !theme.reducedMotion
	);
</script>

{#if enableInteractive}
	<div use:interactiveGlass class={finalClass}>
		{@render children()}
	</div>
{:else}
	<div class={finalClass}>
		{@render children()}
	</div>
{/if}

<style>
	.card {
		border-radius: var(--radius-lg);
		border: 1px solid var(--waku-border);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Default styling for non-glass cards */
	.card:not(.glass):not(.glass-thin):not(.glass-thick):not(.glass-heavy):not(.glass-ultra-thin):not(
			.glass-tinted
		):not(.glass-subtle) {
		background-color: var(--waku-surface-1);
		box-shadow: var(--shadow-md);
	}

	/* Remove default bg when glass is used */
	.card.glass,
	.card.glass-thin,
	.card.glass-thick,
	.card.glass-heavy,
	.card.glass-ultra-thin,
	.card.glass-tinted,
	.card.glass-subtle {
		background-color: transparent;
	}
</style>
