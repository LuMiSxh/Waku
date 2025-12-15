<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<Omit<HTMLDivElement, 'style'>> {
		children: Snippet;
		colspan?: number;
		rowspan?: number;
		variant?: 'neutral' | 'primary' | 'danger';
		style?: 'solid' | 'outline' | 'ghost';
		glass?: boolean;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		onclick?: (e: MouseEvent) => void;
		href?: string;
		disabled?: boolean;
		css?: string;
	}

	let {
		children,
		colspan = 1,
		rowspan = 1,
		variant = 'neutral',
		style = 'solid',
		glass = false,
		padding,
		onclick,
		href,
		class: className,
		disabled = false,
		css = '',
		...r
	}: Props = $props();

	const rest = r as HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLAnchorElement>;

	const density = getContext<'compact' | 'normal' | 'comfortable'>('bento-density') || 'normal';

	const colorMap = {
		neutral: 'var(--waku-surface-1)',
		primary: 'var(--waku-accent)',
		danger: 'var(--color-danger)',
	};

	// If style is outline/ghost, neutral uses border/fg colors instead of surface
	const borderColorMap = {
		neutral: 'var(--waku-border)',
		primary: 'var(--waku-accent)',
		danger: 'var(--color-danger)',
	};

	let tag = $derived(href ? 'a' : 'div');

	function handleKeydown(e: KeyboardEvent) {
		const isLink = !!href;
		if (e.key === 'Enter') {
			e.preventDefault();
			if (onclick && !isLink) onclick(e as unknown as MouseEvent);
		}
		if (e.key === ' ' && !isLink) {
			e.preventDefault();
			if (onclick) onclick(e as unknown as MouseEvent);
		}
	}

	const paddingMap = { none: 'p-0', sm: 'p-3', md: 'p-5', lg: 'p-6' };
	const densityPaddingMap = { compact: 'p-3', normal: 'p-5', comfortable: 'p-6' };
	let activePadding = $derived(padding ? paddingMap[padding] : densityPaddingMap[density]);
</script>

<svelte:element
	this={tag}
	role={onclick && !href ? 'button' : undefined}
	tabindex={onclick || href ? 0 : undefined}
	{onclick}
	onkeydown={handleKeydown}
	{href}
	disabled={disabled || null}
	{...rest}
	class="bento-item style-{style} variant-{variant} {activePadding} {className || ''}"
	class:glass
	class:interactive={!!onclick || !!href}
	style="
		--item-color: {colorMap[variant]};
		--item-border: {borderColorMap[variant]};
		grid-column: span {colspan};
		grid-row: span {rowspan};
		{css || ''}
	"
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
		transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);

		background-color: var(--item-color);
	}

	.bento-item:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--waku-accent);
		z-index: 20;
	}

	.style-solid {
		border-color: var(--waku-border);
		box-shadow: var(--shadow-sm);
	}
	/* Special case: Solid + Neutral = Surface color */
	.style-solid.variant-neutral {
		background-color: var(--waku-surface-1);
	}
	/* Special case: Solid + Danger = Light red bg */
	.style-solid.variant-danger {
		background-color: oklch(from var(--color-danger) 0.96 c h);
		border-color: oklch(from var(--color-danger) 0.9 c h);
		color: var(--color-danger);
	}

	.style-outline {
		background-color: transparent;
		border-color: var(--item-border);
		box-shadow: none;
	}
	.style-outline.variant-danger {
		color: var(--color-danger);
	}

	/* 3. GHOST */
	.style-ghost {
		background-color: transparent;
		border-color: transparent;
		box-shadow: none;
	}

	.glass {
		background: var(--glass-bg);
		background-image: var(--glass-gradient);
		border-color: var(--glass-border);
		box-shadow: var(--glass-shadow);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	/* Highlight parent BentoItem for all seamless elements (Input, Select, Button, Toggle) */
	:global(.glass:has(.variant-seamless:focus-visible)),
	:global(.glass:has(.variant-seamless:focus-within)) {
		background-color: var(--glass-bg-active);
		border-color: var(--waku-accent);
	}

	.interactive {
		cursor: pointer;
	}
	.interactive:hover:not([disabled]) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
		border-color: var(--waku-accent);
		z-index: 10;
	}
	.interactive:active:not([disabled]) {
		transform: translateY(0);
	}
</style>
