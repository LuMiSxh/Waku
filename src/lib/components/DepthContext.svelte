<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Depth } from '$lib/context/theme.svelte.js';
	import { createNestedDepthContext, getThemeContext } from '$lib/context/theme.svelte.js';

	interface Props {
		children: Snippet;
		/**
		 * Override the automatic depth increment with a specific depth
		 */
		depth?: Depth;
		/**
		 * HTML element to render
		 * @default 'div'
		 */
		as?: keyof HTMLElementTagNameMap;
		/**
		 * Additional class names
		 */
		class?: string;
		/**
		 * Additional props to pass to the element
		 */
		[key: string]: unknown;
	}

	let {
		children,
		depth,
		as: element = 'div',
		class: className,
		...rest
	}: Props = $props();

	// Create nested context (auto-increments depth by 1)
	const context = depth !== undefined ? getThemeContext() : createNestedDepthContext();

	// If explicit depth is provided, use it
	if (depth !== undefined) {
		context.setDepth(depth);
	}

	const currentDepth = $derived(context.depth);
</script>

<svelte:element
	this={element}
	class="depth-context {className || ''}"
	data-depth={currentDepth}
	style="--current-depth: {currentDepth}; --parent-depth: {currentDepth};"
	{...rest}
>
	{@render children()}
</svelte:element>

<style>
	.depth-context {
		/* Propagate depth to children */
		position: relative;
	}
</style>
