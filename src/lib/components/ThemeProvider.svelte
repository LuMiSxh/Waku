<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createThemeContext } from '$lib/context/theme.svelte.js';
	import { onMount } from 'svelte';

	interface Props {
		children: Snippet;
		/**
		 * Custom accent color (OKLCH, HSL, or hex)
		 * @default 'oklch(0.65 0.2 250)'
		 */
		accent?: string;
		/**
		 * Enable interactive glass effects globally
		 * @default true
		 */
		interactiveGlass?: boolean;
		/**
		 * Respect prefers-reduced-motion
		 * @default true
		 */
		respectReducedMotion?: boolean;
		/**
		 * Additional class names
		 */
		class?: string;
	}

	let {
		children,
		accent = 'oklch(0.65 0.2 250)',
		interactiveGlass = true,
		respectReducedMotion = true,
		class: className
	}: Props = $props();

	let reducedMotion = $state(false);

	// Create theme context
	const theme = createThemeContext({
		accent,
		interactiveGlass,
		reducedMotion
	});

	// Global cursor position tracking
	let globalMouseX = $state(50);
	let globalMouseY = $state(50);
	let scrollRotation = $state(0);

	onMount(() => {
		// Apply accent color to CSS
		if (accent) {
			document.documentElement.style.setProperty('--waku-accent', accent);
		}

		// Check for reduced motion preference
		if (respectReducedMotion && typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			reducedMotion = mediaQuery.matches;

			// Listen for changes
			const handleChange = (e: MediaQueryListEvent) => {
				reducedMotion = e.matches;
			};
			mediaQuery.addEventListener('change', handleChange);

			// Global cursor tracking
			const handleGlobalMouseMove = (e: MouseEvent) => {
				// Calculate percentage position relative to viewport
				const x = (e.clientX / window.innerWidth) * 100;
				const y = (e.clientY / window.innerHeight) * 100;

				globalMouseX = x;
				globalMouseY = y;

				// Update CSS variables on document root
				document.documentElement.style.setProperty('--waku-global-cursor-x', `${x}%`);
				document.documentElement.style.setProperty('--waku-global-cursor-y', `${y}%`);
			};

			// Global scroll tracking for subtle glass rotation
			const handleGlobalScroll = () => {
				const scrollY = window.scrollY;
				const rotation = (scrollY * 0.05) % 360;
				scrollRotation = rotation;

				document.documentElement.style.setProperty('--waku-global-scroll-rotation', `${rotation}deg`);
				document.documentElement.style.setProperty('--waku-global-scroll-y', `${scrollY}px`);
			};

			window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
			window.addEventListener('scroll', handleGlobalScroll, { passive: true });

			// Initialize values
			handleGlobalScroll();

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
				window.removeEventListener('mousemove', handleGlobalMouseMove);
				window.removeEventListener('scroll', handleGlobalScroll);
			};
		}
	});

	// Watch for accent color changes
	$effect(() => {
		if (accent && typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--waku-accent', accent);
			theme.setAccent(accent);
		}
	});
</script>

<div class="waku-theme-provider {className || ''}" data-depth="0">
	{@render children()}
</div>

<style>
	.waku-theme-provider {
		/* Set initial depth */
		--current-depth: 0;
		--parent-depth: 0;

		/* Ensure theme variables are available */
		color: var(--waku-fg-base);
		background-color: var(--waku-surface-0);
	}
</style>
