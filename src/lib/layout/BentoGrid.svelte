<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	interface Props extends Record<string, unknown> {
		children: Snippet;
		cols?: 1 | 2 | 3 | 4;
		gap?: 'sm' | 'md' | 'lg';
		density?: 'compact' | 'normal' | 'comfortable';
		class?: string;
	}

	let {
		children,
		cols = 3,
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
</script>

<div
	class="grid grid-cols-1 {activeGap} {className || ''}"
	data-density={density}
	{...rest}
	style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); @media (min-width: 768px) grid-template-columns: repeat({cols}, 1fr);"
>
	{@render children()}
</div>
