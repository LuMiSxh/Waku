<script module lang="ts">
	import type { Variant, Size } from '../types/index.js';
	import type { Snippet } from 'svelte';

	export interface ButtonProps {
		/**
		 * Visual style variant of the button
		 * @default 'primary'
		 */
		variant?: Variant;

		/**
		 * Size of the button
		 * @default 'md'
		 */
		size?: Size;

		/**
		 * Whether the button is disabled
		 * @default false
		 */
		disabled?: boolean;

		/**
		 * Button type attribute
		 * @default 'button'
		 */
		type?: 'button' | 'submit' | 'reset';

		/**
		 * Click handler
		 */
		onclick?: (e: MouseEvent) => void;

		/**
		 * Additional CSS classes
		 */
		class?: string;

		/**
		 * ARIA label for accessibility
		 */
		'aria-label'?: string;

		/**
		 * Content snippet
		 */
		children?: Snippet;
	}
</script>

<script lang="ts">
	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		onclick,
		class: className,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class="btn btn-{variant} btn-{size} {className || ''}"
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		border-width: 1px;
		border-color: transparent;
		cursor: pointer;
	}

	.btn-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}
	.btn-md {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
	.btn-lg {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}

	.btn-primary {
		background-color: var(--accent-500);
		color: white;
	}
	.btn-primary:hover:not(:disabled) {
		background-color: var(--accent-600);
	}
	.btn-primary:active:not(:disabled) {
		background-color: var(--accent-700);
	}

	.btn-secondary {
		background-color: var(--waku-bg-layer-1);
		color: var(--waku-fg-layer-1);
		border-color: var(--waku-border);
		backdrop-filter: blur(var(--waku-glass-blur));
	}
	.btn-secondary:hover:not(:disabled) {
		border-color: var(--accent-400);
	}
	.btn-secondary:active:not(:disabled) {
		background-color: var(--accent-50);
	}

	.btn-ghost {
		background-color: transparent;
		color: var(--waku-fg-base);
	}
	.btn-ghost:hover:not(:disabled) {
		background-color: oklch(from var(--waku-fg-base) l c h / 0.1);
	}
	.btn-ghost:active:not(:disabled) {
		background-color: oklch(from var(--waku-fg-base) l c h / 0.15);
	}

	.btn-outline {
		background-color: transparent;
		color: var(--waku-fg-base);
		border-width: 1px;
		border-color: var(--waku-border);
	}

	.btn-outline:hover:not(:disabled) {
		color: var(--accent-500);
		border-color: var(--accent-500);
		background-color: transparent;
	}

	.btn-outline:active:not(:disabled) {
		background-color: var(--accent-100);
		color: var(--accent-600);
		border-color: var(--accent-600);
	}

	.btn-danger {
		background-color: var(--color-danger);
		color: white;
	}
	.btn-danger:hover:not(:disabled) {
		opacity: 0.9;
	}
	.btn-danger:active:not(:disabled) {
		opacity: 0.8;
	}
</style>
