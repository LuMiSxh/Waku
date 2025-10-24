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
			timeout: 5000
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
	import { fly } from 'svelte/transition';
	import VStack from '$lib/layout/VStack.svelte';

	const icons = {
		info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>`,
		success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
		warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
		error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
		close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
	};
</script>

{#if toasts.length > 0}
	<div class="toast-container">
		{#each toasts as t (t.id)}
			<div
				class="toast-wrapper glass"
				in:fly={{ y: -20, duration: 300 }}
				out:fly={{ x: '100%', duration: 200 }}
			>
				<div class="toast-content toast-{t.type ?? 'info'}">
					<div class="icon">{@html icons[t.type ?? 'info']}</div>

					<VStack gap="none" class="grow">
						<p class="title">{@html t.title}</p>
						{#if t.description}
							<p class="description">{@html t.description}</p>
						{/if}
					</VStack>

					<button class="close-button" onclick={() => removeToast(t.id)} aria-label="Close">
						{@html icons.close}
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: 100%;
		max-width: 22rem;
		z-index: var(--z-toast);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.toast-wrapper {
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
	}

	.toast-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: var(--radius-lg);
		border-left-width: 4px;
		border-left-style: solid;
	}

	.toast-info {
		border-left-color: var(--color-info);
	}
	.toast-info .icon {
		color: var(--color-info);
	}

	.toast-success {
		border-left-color: var(--color-success);
	}
	.toast-success .icon {
		color: var(--color-success);
	}

	.toast-warning {
		border-left-color: var(--color-warning);
	}
	.toast-warning .icon {
		color: var(--color-warning);
	}

	.toast-error {
		border-left-color: var(--color-danger);
	}
	.toast-error .icon {
		color: var(--color-danger);
	}

	.icon {
		flex-shrink: 0;
		margin-top: 2px;
	}

	.title {
		font-weight: 600;
		color: var(--waku-fg-base);
	}

	.description {
		font-size: 0.875rem;
		color: var(--waku-fg-muted);
	}

	.close-button {
		flex-shrink: 0;
		padding: 0.25rem;
		border-radius: 9999px;
		color: var(--waku-fg-muted);
		transition: all var(--transition-fast);
	}

	.close-button:hover {
		background-color: var(--neutral-200);
		color: var(--waku-fg-base);
	}
</style>
