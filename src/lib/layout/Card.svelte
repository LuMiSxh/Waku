<script lang="ts">
	import type { Elevation } from '$lib/types/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		elevation?: Elevation;
		class?: string;
		padding?: 'sm' | 'md' | 'lg' | 'none';
	}

	let { children, class: className, padding = 'md', elevation = 1 }: Props = $props();

	const paddingMap = {
		none: 'p-0',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<div class="card glass elevation-{elevation} {paddingMap[padding]} {className || ''}">
	{@render children()}
</div>

<style>
	.card {
		border-radius: var(--radius-lg);
		border: 1px solid var(--waku-border);
		background-color: var(--waku-bg-layer-1);
		box-shadow: var(--shadow-md);
	}
</style>
