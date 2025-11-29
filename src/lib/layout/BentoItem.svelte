<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';

	interface Props {
		children: Snippet;
		// Layout
		colspan?: 1 | 2 | 3 | 4;
		rowspan?: 1 | 2 | 3 | 4;

		// Style
		variant?: 'surface' | 'glass' | 'outline' | 'danger';
		padding?: 'none' | 'sm' | 'md' | 'lg';

		// Interaction
		onclick?: (e: MouseEvent) => void;
		href?: string;
		class?: string;
		style?: string;
		disabled?: boolean;
	}

	let {
		children,
		colspan = 1,
		rowspan = 1,
		variant = 'surface',
		padding,
		onclick,
		href,
		class: className,
		style,
		disabled = false,
	}: Props = $props();

	const density = getContext<'compact' | 'normal' | 'comfortable'>('bento-density') || 'normal';

	// Always use 'div' for onclick to avoid nested button issues
	let tag = $derived(href ? 'a' : 'div');

	// Keyboard handler for onclick functionality
	function handleKeydown(e: KeyboardEvent) {
		if (onclick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onclick(e as unknown as MouseEvent);
		}
	}

	const paddingMap = { none: 'p-0', sm: 'p-3', md: 'p-5', lg: 'p-6' };

	// Density-based padding map
	const densityPaddingMap = {
		compact: 'p-3',
		normal: 'p-5',
		comfortable: 'p-6',
	};

	const activePadding = $derived(padding ? paddingMap[padding] : densityPaddingMap[density]);
</script>

<svelte:element
	this={tag}
	role={onclick && !href ? 'button' : undefined}
	tabindex={onclick || href ? 0 : undefined}
	{onclick}
	onkeydown={handleKeydown}
	{href}
	disabled={disabled || null}
	{style}
	class="bento-item variant-{variant} {activePadding} col-span-{colspan} row-span-{rowspan} {className ||
		''}"
	class:interactive={!!onclick || !!href}
>
	{@render children()}
</svelte:element>

<style>
	.bento-item {
		border-radius: var(--radius-xl);
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
		text-align: left;
		width: 100%;
		border: 1px solid transparent;
		transition:
			transform 0.2s cubic-bezier(0.2, 0, 0, 1),
			box-shadow 0.2s,
			border-color 0.2s;
	}

	.bento-item:focus-visible {
		outline: none;
	}

	:global(.bento-item:has(.variant-seamless:focus-visible)),
	.bento-item:has(.variant-seamless:focus-within) {
		border-color: var(--waku-accent);
		box-shadow:
			var(--shadow-md),
			0 0 0 1px var(--waku-accent);
		z-index: 5;
	}
	.interactive:focus-visible {
		outline: none;
		border-color: var(--waku-border);
		box-shadow:
			var(--shadow-md),
			0 0 0 2px var(--waku-accent);

		z-index: 20;
	}

	.variant-glass.interactive:focus-visible {
		border-color: var(--glass-border);
		box-shadow:
			var(--glass-shadow),
			0 0 0 2px var(--waku-accent);
	}

	.variant-surface {
		background-color: var(--waku-surface-1);
		border-color: var(--waku-border);
		box-shadow: var(--shadow-sm);
	}

	.variant-glass {
		background: var(--glass-bg);
		background-image: var(--glass-gradient);
		border-color: var(--glass-border);
		box-shadow: var(--glass-shadow);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}
	.variant-glass::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		box-shadow: var(--glass-highlight, inset 0 0 0 1px rgba(255, 255, 255, 0.2));
	}

	:global(.variant-glass:has(.variant-seamless:focus-visible)) {
		background-color: oklch(1 0 0 / 0.6);
		border-color: var(--waku-accent);
	}

	.variant-danger {
		background-color: oklch(from var(--color-danger) 0.96 c h);
		border: 1px solid oklch(from var(--color-danger) 0.9 c h);
		color: var(--color-danger);
	}

	.interactive {
		cursor: pointer;
	}
	.interactive:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--waku-accent);
		z-index: 10;
	}
	.interactive:active:not(:disabled) {
		transform: translateY(0);
	}

	.col-span-1 {
		grid-column: span 1;
	}
	.col-span-2 {
		grid-column: span 2;
	}
	.col-span-3 {
		grid-column: span 3;
	}
	.col-span-4 {
		grid-column: span 4;
	}

	.row-span-1 {
		grid-row: span 1;
	}
	.row-span-2 {
		grid-row: span 2;
	}
</style>
