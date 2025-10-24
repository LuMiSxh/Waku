<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		children: Snippet;
		variant?: Variant;
		class?: string;
	}

	let { children, variant = 'secondary', class: className }: Props = $props();
</script>

<span class="badge {variant} {className || ''}">
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
	}
	.badge.primary {
		background-color: var(--accent-100);
		color: var(--accent-700);
	}
	.badge.secondary {
		background-color: var(--neutral-200);
		color: var(--neutral-700);
	}
	.badge.success {
		background-color: oklch(from var(--color-success) l c h / 0.15);
		color: var(--color-success);
	}
	.badge.warning {
		background-color: oklch(from var(--color-warning) l c h / 0.15);
		color: var(--color-warning);
	}
	.badge.danger {
		background-color: oklch(from var(--color-danger) l c h / 0.15);
		color: var(--color-danger);
	}
	.badge.info {
		background-color: oklch(from var(--color-info) l c h / 0.15);
		color: var(--color-info);
	}
</style>
