<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		IconInfoCircle,
		IconCheck,
		IconAlertTriangle,
		IconAlertCircle,
	} from '@tabler/icons-svelte';

	type Variant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
	type Style = 'subtle' | 'solid' | 'outline';

	interface Props {
		children: Snippet;
		variant?: Variant;
		style?: Style;
		glass?: boolean;
		icon?: boolean;
		class?: string;
		css?: string;
	}

	let {
		children,
		variant = 'info',
		style = 'subtle',
		glass = false,
		icon = true,
		class: className,
		css = '',
	}: Props = $props();

	const icons = {
		info: IconInfoCircle,
		success: IconCheck,
		warning: IconAlertTriangle,
		danger: IconAlertCircle,
		neutral: IconInfoCircle,
	};

	const colorMap: Record<Variant, string> = {
		info: 'var(--color-info)',
		success: 'var(--color-success)',
		warning: 'var(--color-warning)',
		danger: 'var(--color-danger)',
		neutral: 'var(--waku-fg-muted)',
	};
</script>

<div
	role="alert"
	class="alert style-{style} {className || ''}"
	class:glass
	style="--alert-color: {colorMap[variant]}; {css}"
>
	{#if icon}
		{@const Icon = icons[variant]}
		<div class="alert-icon">
			<Icon size={20} stroke={2} />
		</div>
	{/if}
	<div class="alert-content">
		{@render children()}
	</div>
</div>

<style>
	.alert {
		position: relative;
		display: flex;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-lg);
		border: 1px solid transparent;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.alert-icon {
		flex-shrink: 0;
		color: var(--alert-color);
		margin-top: 1px;
	}

	.alert-content {
		flex-grow: 1;
		color: var(--waku-fg-base);
	}

	.style-subtle {
		background-color: oklch(from var(--alert-color) l c h / 0.1);
		border-color: oklch(from var(--alert-color) l c h / 0.1);
	}
	.style-subtle .alert-content {
		color: oklch(from var(--alert-color) calc(l - 0.2) c h);
	}

	.style-solid {
		background-color: var(--alert-color);
		color: white;
	}
	.style-solid .alert-icon {
		color: white;
	}
	.style-solid .alert-content {
		color: white;
	}

	.style-outline {
		background-color: transparent;
		border-color: var(--alert-color);
	}
	.style-outline .alert-content {
		color: var(--alert-color);
	}

	.glass {
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.glass.style-subtle {
		background-color: oklch(from var(--alert-color) l c h / 0.15);
		border-top: 1px solid oklch(from var(--alert-color) l c h / 0.2);
	}

	.glass.style-solid {
		background-color: oklch(from var(--alert-color) l c h / 0.85);
		box-shadow: 0 4px 12px oklch(from var(--alert-color) l c h / 0.2);
	}
</style>
