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
	<span class="tooltip-text glass">
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
		margin-bottom: 0.75rem;

		background-color: oklch(0.15 0 0 / 0.7);
		color: oklch(0.98 0 0);
		backdrop-filter: blur(8px);
		box-shadow: inset 0 0 0 1px oklch(1 0 0 / 0.1);

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

	.tooltip-text::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-top: -4px;
		transform: translateX(-50%) rotate(45deg);
		width: 0.5rem;
		height: 0.5rem;

		background-color: oklch(0.15 0 0 / 0.7);
		box-shadow: inset 0 0 0 1px oklch(1 0 0 / 0.1);
	}

	.tooltip-wrapper:hover .tooltip-text,
	.tooltip-wrapper:focus-within .tooltip-text {
		opacity: 1;
		visibility: visible;
	}
</style>
