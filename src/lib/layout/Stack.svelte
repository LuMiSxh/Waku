<script lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		Alignment,
		Justification,
		Direction,
		Spacing,
		Elevation
	} from '$lib/types/index.js';
	import { createNestedDepthContext, getThemeContext } from '$lib/context/theme.svelte.js';

	interface Props extends Record<string, unknown> {
		children: Snippet;
		as?: keyof HTMLElementTagNameMap;
		direction?: Direction;
		gap?: Spacing;
		align?: Alignment;
		justify?: Justification;
		class?: string;
		elevation?: Elevation;
		/**
		 * Disable automatic depth increment for children
		 * @default false
		 */
		noDepth?: boolean;
	}

	let {
		children,
		as: element = 'div',
		direction = 'vertical',
		gap = 'md',
		align,
		justify,
		elevation,
		noDepth = false,
		class: className,
		...rest
	}: Props = $props();

	// Create nested depth context (auto-increment depth)
	// unless noDepth is true
	if (!noDepth) {
		createNestedDepthContext();
	}

	const theme = getThemeContext();
	const currentDepth = $derived(theme.depth);

	const spacingMap: Record<Spacing, string> = {
		none: '0',
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2.5rem',
		'2xl': '4rem'
	};

	let style = $derived(
		[
			`--stack-direction: ${direction === 'vertical' ? 'column' : 'row'}`,
			`--stack-gap: ${spacingMap[gap]}`,
			align ? `--stack-align: ${align}` : '',
			justify ? `--stack-justify: ${justify}` : '',
			`--current-depth: ${currentDepth}`,
			`--parent-depth: ${currentDepth}`
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<svelte:element
	this={element}
	{style}
	class="stack {elevation !== undefined ? `elevation-${elevation}` : ''} {className || ''}"
	data-depth={currentDepth}
	{...rest}
>
	{@render children()}
</svelte:element>

<style>
	.stack {
		display: flex;
		flex-direction: var(--stack-direction, column);
		gap: var(--stack-gap, 1rem);
		align-items: var(--stack-align, stretch);
		justify-content: var(--stack-justify, flex-start);
	}
</style>
