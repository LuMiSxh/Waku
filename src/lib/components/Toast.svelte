<script lang="ts" module>
	let toasts = $state<Toast[]>([]);

	export type Toast = {
		id: number;
		title: string;
		description?: string;
		type?: 'success' | 'error' | 'warning' | 'info';
		timeout: number | null;
	};

	type ToastOptions = {
		title: string;
		description?: string;
		type?: 'success' | 'error' | 'warning' | 'info';
		timeout?: number | null;
	};

	/**
	 * Displays a toast notification.
	 * Can be called with a simple string or an options object.
	 */
	export function toast(message: string | ToastOptions) {
		const id = Date.now() + Math.random();

		const defaults = {
			id,
			type: 'info' as const,
			timeout: 5000,
		};

		const newToast: Toast =
			typeof message === 'string' ? { ...defaults, title: message } : { ...defaults, ...message };

		toasts.push(newToast);

		if (newToast.timeout) {
			setTimeout(() => {
				removeToast(id);
			}, newToast.timeout);
		}
	}

	function removeToast(id: number) {
		toasts = toasts.filter((t) => t.id !== id);
	}
</script>

<script lang="ts">
	/* eslint svelte/no-at-html-tags: "off" */
	import { glassSlide } from '$lib/actions/index.js';
	import {
		IconInfoCircle,
		IconCheck,
		IconAlertTriangle,
		IconAlertCircle,
		IconX,
	} from '@tabler/icons-svelte';

	const icons = {
		info: IconInfoCircle,
		success: IconCheck,
		warning: IconAlertTriangle,
		error: IconAlertCircle,
	};

	const colors = {
		info: 'var(--color-info)',
		success: 'var(--color-success)',
		warning: 'var(--color-warning)',
		error: 'var(--color-danger)',
	};
</script>

<div class="toast-container" role="status" aria-live="polite">
	{#each toasts as t (t.id)}
		{@const IconComponent = icons[t.type || 'info']}
		<div class="toast-item glass-heavy" transition:glassSlide={{ duration: 400, x: 50, blur: 12 }}>
			<div class="toast-icon" style="color: {colors[t.type || 'info']}">
				<IconComponent size={22} stroke={2} />
			</div>

			<div class="toast-body">
				<p class="toast-title">{@html t.title}</p>
				{#if t.description}
					<p class="toast-desc">{@html t.description}</p>
				{/if}
			</div>

			<button class="toast-close" onclick={() => removeToast(t.id)} aria-label="Close">
				<IconX size={18} stroke={2.5} />
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		z-index: var(--z-toast);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 24rem;
		pointer-events: none;
	}

	.toast-item {
		pointer-events: auto;
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem 1.25rem;

		border-radius: var(--radius-xl);
		z-index: var(--z-toast);
	}

	.toast-icon {
		flex-shrink: 0;
		margin-top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.toast-body {
		flex-grow: 1;
		min-width: 0;
	}

	.toast-title {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--waku-fg-base);
		line-height: 1.3;
	}

	.toast-desc {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--waku-fg-muted);
		line-height: 1.4;
	}

	.toast-close {
		flex-shrink: 0;
		margin-top: 0.125rem;
		margin-right: -0.25rem;
		padding: 0.25rem;
		border-radius: var(--radius-full);
		color: var(--waku-fg-muted);
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.7;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	.toast-close:hover {
		opacity: 1;
		background-color: oklch(from var(--waku-fg-base) l c h / 0.1);
		color: var(--waku-fg-base);
	}

	.toast-close:active {
		transform: scale(0.9);
	}
</style>
