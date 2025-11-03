<script lang="ts">
	import Stack from './Stack.svelte';
	import type { Snippet } from 'svelte';
	import type { Alignment, Justification, Spacing, Elevation } from '$lib/types/index.js';

	interface Props extends Record<string, unknown> {
		children: Snippet;
		as?: keyof HTMLElementTagNameMap;
		gap?: Spacing;
		align?: Alignment;
		justify?: Justification;
		class?: string;
		elevation?: Elevation;
	}

	let { children, ...rest }: Props = $props();
</script>

<Stack direction="vertical" {...rest}>
	{@render children()}
</Stack>
