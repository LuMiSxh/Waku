<script lang="ts">
	import Stack from './Stack.svelte';
	import type { Snippet } from 'svelte';
	import type { Alignment, Justification, Spacing } from '$lib/types/index.js';

	interface Props {
		children: Snippet;
		as?: keyof HTMLElementTagNameMap;
		gap?: Spacing;
		align?: Alignment;
		justify?: Justification;
		class?: string;
	}

	let { children, ...rest }: Props = $props();
</script>

<Stack direction="vertical" {...rest}>
	{@render children()}
</Stack>
