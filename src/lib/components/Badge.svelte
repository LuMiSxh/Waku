<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
	type Style = 'solid' | 'subtle' | 'outline' | 'ghost';
	type Size = 'sm' | 'md';

	interface Props {
		children: Snippet;
		variant?: Variant;
		style?: Style;
		size?: Size;
		glass?: boolean;
		class?: string;
		css?: string;
	}

	let {
		children,
		variant = 'neutral',
		style = 'subtle',
		size = 'md',
		glass = false,
		class: className,
		css = '',
	}: Props = $props();

	const colorMap: Record<Variant, string> = {
		neutral: 'var(--waku-fg-muted)',
		primary: 'var(--waku-accent)',
		success: 'var(--color-success)',
		warning: 'var(--color-warning)',
		danger: 'var(--color-danger)',
		info: 'var(--color-info)',
	};
</script>

<span
	class="badge style-{style} size-{size} {className || ''}"
	class:glass
	style="--badge-color: {colorMap[variant]}; {css}"
>
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		border-radius: var(--radius-full);
		font-weight: 600;
		transition: all 0.2s ease;
		line-height: 1;

		border: 1px solid transparent;
	}

	.size-sm {
		padding: 0.125rem 0.5rem;
		font-size: 0.65rem; /* ~10px */
		height: 1.25rem;
	}

	.size-md {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem; /* 12px */
		height: 1.5rem;
	}

	.style-solid {
		background-color: var(--badge-color);
		color: oklch(from var(--badge-color) clamp(0, (0.6 - l) * 999, 1) 0 0);
		box-shadow: var(--shadow-sm);
	}

	.style-subtle {
		background-color: oklch(from var(--badge-color) l c h / 0.15);
		color: oklch(from var(--badge-color) calc(l - 0.15) c h);
	}

	.style-outline {
		background-color: transparent;
		border-color: oklch(from var(--badge-color) l c h / 0.4);
		color: var(--badge-color);
	}

	.style-ghost {
		background-color: transparent;
		color: var(--badge-color);
	}
	.style-ghost:hover {
		background-color: oklch(from var(--badge-color) l c h / 0.1);
	}

	.glass {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.glass.style-solid {
		background-color: oklch(from var(--badge-color) l c h / 0.85);
		color: oklch(from var(--badge-color) clamp(0, (0.6 - l) * 999, 1) 0 0);
		border: 1px solid oklch(1 0 0 / 0.2);
		box-shadow:
			0 4px 12px oklch(from var(--badge-color) l c h / 0.3),
			inset 0 1px 0 oklch(1 0 0 / 0.3);
	}

	.glass.style-subtle {
		background-color: oklch(from var(--badge-color) l c h / 0.15);
		border: 1px solid oklch(from var(--badge-color) l c h / 0.2);
		box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.2);
	}
</style>
