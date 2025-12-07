<script module lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Variant, Size } from '../types/index.js';
	import type { Snippet } from 'svelte';

	export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
		 * Tab index for keyboard navigation
		 */
		tabindex?: number;

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
		tabindex,
		children,
		...rest
	}: ButtonProps = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	{tabindex}
	class="btn btn-{variant} btn-{size} {className || ''}"
	{...rest}
>
	{#if children}
		<span class="btn-content">
			{@render children()}
		</span>
	{/if}
</button>
