<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		text: string;
		class?: string;
	}
	let { children, text, class: className }: Props = $props();
</script>

<div class="tooltip-wrapper {className || ''}">
	{@render children()}
	<span class="tooltip-text">
		{text}
	</span>
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-flex;
	}
	.tooltip-text {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		/* Adjust margin to make space for the arrow */
		margin-bottom: 0.75rem; /* 12px */

		background-color: var(--neutral-800);
		color: var(--neutral-100);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		white-space: nowrap;

		opacity: 0;
		visibility: hidden;
		transition:
			opacity 150ms,
			visibility 150ms;
		z-index: var(--z-tooltip);
	}

	/* The new arrow */
	.tooltip-text::after {
		content: '';
		position: absolute;
		top: 85%;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		width: 0.5rem; /* 8px */
		height: 0.5rem; /* 8px */
		background-color: var(--neutral-800);
	}

	.tooltip-wrapper:hover .tooltip-text,
	.tooltip-wrapper:focus-within .tooltip-text {
		opacity: 1;
		visibility: visible;
	}
</style>
