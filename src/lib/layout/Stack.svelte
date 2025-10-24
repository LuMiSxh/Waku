<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Alignment, Justification, Direction, Spacing } from '$lib/types/index.js';

	interface Props {
		children: Snippet;
		as?: keyof HTMLElementTagNameMap;
		direction?: Direction;
		gap?: Spacing;
		align?: Alignment;
		justify?: Justification;
		class?: string;
	}

	let {
		children,
		as: element = 'div',
		direction = 'vertical',
		gap = 'md',
		align,
		justify,
		class: className
	}: Props = $props();

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
			justify ? `--stack-justify: ${justify}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<svelte:element this={element} {style} class="stack {className || ''}">
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
