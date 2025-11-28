<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		cols?: 1 | 2 | 3 | 4; // Default columns on large screens
		gap?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { children, cols = 3, gap = 'md', class: className }: Props = $props();

	const gapMap = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };
</script>

<div
	class="grid grid-cols-1 {gapMap[gap]} {className || ''}"
	style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); @media (min-width: 768px) grid-template-columns: repeat({cols}, 1fr);"
>
	{@render children()}
</div>
