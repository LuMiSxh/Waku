<script lang="ts">
	import type { Snippet } from 'svelte';
	type Variant = 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		children: Snippet;
		variant?: Variant;
		class?: string;
	}
	let { children, variant = 'info', class: className }: Props = $props();
</script>

<div role="alert" class="alert {variant} {className || ''}">
	{@render children()}
</div>

<style>
	.alert {
		padding: 1rem;
		border-radius: var(--radius-md);
		border-width: 1px;
		border-left-width: 4px;
	}
	.alert.info {
		background-color: oklch(from var(--color-info) l c h / 0.1);
		border-color: oklch(from var(--color-info) l c h / 0.2);
		border-left-color: var(--color-info);
		color: var(--color-info);
	}
	.alert.success {
		background-color: oklch(from var(--color-success) l c h / 0.1);
		border-color: oklch(from var(--color-success) l c h / 0.2);
		border-left-color: var(--color-success);
		color: var(--color-success);
	}
	.alert.warning {
		background-color: oklch(from var(--color-warning) l c h / 0.1);
		border-color: oklch(from var(--color-warning) l c h / 0.2);
		border-left-color: var(--color-warning);
		color: var(--color-warning);
	}
	.alert.danger {
		background-color: oklch(from var(--color-danger) l c h / 0.1);
		border-color: oklch(from var(--color-danger) l c h / 0.2);
		border-left-color: var(--color-danger);
		color: var(--color-danger);
	}
</style>
