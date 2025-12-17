<script module lang="ts">
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type ButtonVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
	export type ButtonStyle = 'solid' | 'subtle' | 'outline' | 'ghost' | 'seamless';
	export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	type BaseProps = {
		variant?: ButtonVariant;
		style?: ButtonStyle;
		size?: ButtonSize;
		glass?: boolean;
		loading?: boolean;
		children?: Snippet;
		class?: string;
		css?: string;
	};

	type Props = BaseProps &
		(({ href?: never } & HTMLButtonAttributes) | ({ href: string } & HTMLAnchorAttributes));
</script>

<script lang="ts">
	import { LoadingSpinner } from './index.js';

	let {
		variant = 'primary',
		style = 'solid',
		size = 'md',
		glass = false,
		loading = false,
		children,
		class: className,
		css = '',
		...r
	}: Props = $props();

	const rest = r as HTMLButtonAttributes & HTMLAnchorAttributes;

	// Map colors to CSS variables
	const colorMap: Record<ButtonVariant, string> = {
		primary: 'var(--accent-500)',
		neutral: 'var(--neutral-950)',
		success: 'var(--color-success)',
		warning: 'var(--color-warning)',
		danger: 'var(--color-danger)',
	};

	// Helper for neutral solid background
	const isNeutralSolid = variant === 'neutral' && style === 'solid';
	const cssVars = `--btn-color: ${colorMap[variant]}; ${css}`;
</script>

{#if rest.href}
	<a
		class="btn variant-{style} {style !== 'seamless' ? `size-${size}` : ''} {className || ''}"
		class:glass
		class:neutral-solid={isNeutralSolid}
		style={cssVars}
		role="button"
		aria-disabled={loading}
		tabindex={style === 'seamless' ? 0 : undefined}
		{...rest}
	>
		{#if loading}
			<LoadingSpinner size="sm" class="mr-2" />
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button
		class="btn variant-{style} {style !== 'seamless' ? `size-${size}` : ''} {className || ''}"
		class:glass
		class:neutral-solid={isNeutralSolid}
		style={cssVars}
		type={rest.type ?? 'button'}
		disabled={rest.disabled || loading}
		tabindex={style === 'seamless' ? 0 : undefined}
		{...rest}
	>
		{#if loading}
			<LoadingSpinner size="sm" class="mr-2" />
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;

		font-weight: 500;
		border-radius: var(--radius-md);
		border: 1px solid transparent; /* Reserve space for border */

		cursor: pointer;
		transition: all 0.2s var(--spring-smooth, ease);
		white-space: nowrap;
		text-decoration: none;
	}

	.btn:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 2px var(--waku-surface-1),
			0 0 0 4px var(--btn-color);
	}

	.btn:disabled,
	.btn[aria-disabled='true'] {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}

	.btn:active:not(:disabled) {
		transform: scale(0.97);
	}

	.size-sm {
		height: 2rem; /* 32px */
		padding: 0 0.75rem;
		font-size: 0.875rem;
	}

	.size-md {
		height: 2.5rem; /* 40px */
		padding: 0 1rem;
		font-size: 0.95rem;
	}

	.size-lg {
		height: 3rem; /* 48px */
		padding: 0 1.5rem;
		font-size: 1.125rem;
		border-radius: var(--radius-lg);
	}

	.size-icon {
		height: 2.5rem;
		width: 2.5rem;
		padding: 0;
	}

	.variant-solid {
		background-color: var(--btn-color);
		color: white;
		box-shadow: var(--shadow-sm);
	}

	/* Automatic text color for primary variant based on lightness */
	.variant-solid:not(.neutral-solid) {
		color: oklch(from var(--btn-color) clamp(0, (0.6 - l) * 999, 1) 0 0);
	}
	.variant-solid:hover:not(:disabled) {
		filter: brightness(110%);
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
	}
	.neutral-solid {
		background-color: var(--waku-fg-base);
		color: var(--waku-surface-1);
	}

	.variant-subtle {
		position: relative;
		color: var(--btn-color);
	}
	.variant-subtle::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--btn-color);
		opacity: 0.1;
		border-radius: inherit;
		z-index: -1;
	}
	.variant-subtle:hover:not(:disabled)::before {
		opacity: 0.18;
	}

	.variant-outline {
		background-color: transparent;
		border-color: var(--btn-color);
		color: var(--btn-color);
	}
	.variant-outline {
		position: relative;
	}
	.variant-outline:hover:not(:disabled)::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--btn-color);
		opacity: 0.05;
		border-radius: inherit;
		z-index: -1;
	}

	.variant-ghost {
		position: relative;
		background-color: transparent;
		color: var(--btn-color);
	}
	.variant-ghost:hover:not(:disabled)::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--btn-color);
		opacity: 0.08;
		border-radius: inherit;
		z-index: -1;
	}

	.variant-seamless {
		position: relative;
		border: none;
		background-color: transparent;
		padding: 0;
		margin: 0;
		font-weight: 700;
		font-size: 1.25rem;
		height: auto;
		color: var(--waku-fg-base);
	}

	.variant-seamless:hover:not(:disabled) {
		color: var(--waku-accent);
	}

	.variant-seamless {
		position: relative;
	}
	.variant-seamless:focus-visible {
		box-shadow: none;
		outline: none;
		padding: 0.25rem 0.5rem;
		margin: -0.25rem -0.5rem;
		border-radius: var(--radius-md);
		text-decoration: underline;
		text-decoration-color: var(--accent-500);
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
	}
	.variant-seamless:focus-visible::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--accent-500);
		opacity: 0.08;
		border-radius: inherit;
		z-index: -1;
	}

	.variant-seamless:active:not(:disabled) {
		transform: scale(1);
	}

	.glass {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.glass.variant-solid {
		position: relative;
		border: 1px solid oklch(1 0 0 / 0.2);
		box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.2);
	}
	.glass.variant-solid::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--btn-color);
		opacity: 0.8;
		border-radius: inherit;
		z-index: -1;
	}
	.glass.variant-solid:hover:not(:disabled)::before {
		opacity: 0.9;
	}

	.glass.variant-subtle,
	.glass.variant-outline,
	.glass.variant-ghost {
		/* Add a bit more opacity for readability on glass */
		backdrop-filter: blur(8px);
	}
</style>
