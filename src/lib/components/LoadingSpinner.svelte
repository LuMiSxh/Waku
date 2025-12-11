<script lang="ts">
	import { IconLoader2 } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import { portalled, trapScroll } from '$lib/actions/index.js';

	interface Props {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		fullscreen?: boolean;
		text?: string;
		class?: string;
	}

	let { size = 'md', fullscreen = false, text, class: className }: Props = $props();

	const iconSizes = {
		sm: 16,
		md: 24,
		lg: 32,
		xl: 48,
	};
</script>

{#if fullscreen}
	<div
		use:portalled
		use:trapScroll={true}
		class="spinner-overlay"
		transition:fade={{ duration: 200 }}
	>
		<div class="spinner-container glass-heavy">
			<div class="spin-wrapper">
				<IconLoader2 size={iconSizes[size] || 24} />
			</div>
			{#if text}
				<span class="spinner-text">{text}</span>
			{/if}
		</div>
	</div>
{:else}
	<div class="spinner-inline {className || ''}" role="status" aria-label={text || 'Loading'}>
		<div class="spin-wrapper text-current">
			<IconLoader2 size={iconSizes[size]} />
		</div>
		{#if text}
			<span class="sr-only">{text}</span>
		{/if}
	</div>
{/if}

<style>
	/* Animation */
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.spin-wrapper {
		animation: spin 0.8s linear infinite;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner-inline {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.spinner-overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		background-color: var(--waku-backdrop-bg);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;
		min-width: 120px;
		min-height: 120px;

		color: var(--waku-fg-base);
	}

	.spinner-text {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--waku-fg-muted);
		letter-spacing: 0.02em;
	}
</style>
