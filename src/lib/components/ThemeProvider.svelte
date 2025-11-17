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
	let cursorAngle = $state(0);

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

			// Combined global cursor and scroll tracking
			const handleGlobalUpdate = (e?: MouseEvent) => {
				// Cursor tracking
				if (e) {
					// Calculate percentage position relative to viewport
					const x = (e.clientX / window.innerWidth) * 100;
					const y = (e.clientY / window.innerHeight) * 100;

					globalMouseX = x;
					globalMouseY = y;

					// Calculate angle from center for hue rotation
					const centerX = window.innerWidth / 2;
					const centerY = window.innerHeight / 2;
					const deltaX = e.clientX - centerX;
					const deltaY = e.clientY - centerY;
					const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
					cursorAngle = angle;

					document.documentElement.style.setProperty('--waku-global-cursor-x', `${x}%`);
					document.documentElement.style.setProperty('--waku-global-cursor-y', `${y}%`);
					document.documentElement.style.setProperty('--waku-cursor-angle', `${angle}deg`);
				}

				// Scroll tracking - combine with cursor position for dynamic rotation
				const scrollY = window.scrollY;
				const scrollInfluence = (scrollY * 0.03) % 360;
				const combinedRotation = (scrollInfluence + cursorAngle * 0.5) % 360;
				scrollRotation = combinedRotation;

				document.documentElement.style.setProperty(
					'--waku-global-rotation',
					`${combinedRotation}deg`
				);
				document.documentElement.style.setProperty('--waku-global-scroll-y', `${scrollY}px`);

				// Calculate hue shift based on angle (-180 to 180 -> 0 to 360)
				const hueShift = ((cursorAngle + 180) / 360) * 60 - 30; // -30 to +30 degree hue shift
				document.documentElement.style.setProperty('--waku-cursor-hue-shift', `${hueShift}deg`);
			};

			window.addEventListener('mousemove', handleGlobalUpdate, { passive: true });
			window.addEventListener('scroll', () => handleGlobalUpdate(), { passive: true });

			// Initialize values
			handleGlobalUpdate();

			return () => {
				mediaQuery.removeEventListener('change', handleChange);
				window.removeEventListener('mousemove', handleGlobalUpdate);
				window.removeEventListener('scroll', handleGlobalUpdate);
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
