<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		cols?: 1 | 2 | 3 | 4;
		rows?: number | string;
		rowHeight?: string | 'auto' | 'fit-content';
		gap?: 'sm' | 'md' | 'lg';
		density?: 'compact' | 'normal' | 'comfortable';
		class?: string;
	}

	let {
		children,
		cols = 3,
		rows,
		rowHeight = 'auto',
		gap = 'md',
		density = 'normal',
		class: className,
		...rest
	}: Props = $props();

	setContext('bento-density', density);

	const gapMap = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
	const densityGapMap = {
		compact: 'gap-3',
		normal: 'gap-4',
		comfortable: 'gap-6',
	};

	const activeGap = density !== 'normal' ? densityGapMap[density] : gapMap[gap];

	// Determine template-rows value
	let templateRows = $derived.by(() => {
		if (typeof rows === 'number') return `repeat(${rows}, 1fr)`;
		if (typeof rows === 'string') return rows;
		return 'none';
	});

	// Determine auto-rows value based on rowHeight
	let autoRows = $derived.by(() => {
		if (rowHeight === 'auto') return 'auto';
		if (rowHeight === 'fit-content') return 'min-content';
		return rowHeight;
	});

	let cssVars = $derived(`
		--bento-cols: ${cols};
		--bento-rows: ${templateRows};
		--bento-row-height: ${autoRows};
	`);
</script>

<div
	class="grid grid-cols-1 {activeGap} {className || ''}"
	data-density={density}
	{...rest}
	style={cssVars}
>
	{@render children()}
</div>

<style>
	div {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		grid-auto-rows: var(--bento-row-height);
		grid-template-rows: var(--bento-rows);
	}

	@media (min-width: 768px) {
		div {
			grid-template-columns: repeat(var(--bento-cols), 1fr);
		}
	}
</style>
