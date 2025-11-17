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
	import { glassSlide, liquidGlass } from '$lib/actions/index.js';
	import VStack from '$lib/layout/VStack.svelte';
	import { getThemeContext } from '$lib/context/theme.svelte.js';

	const theme = getThemeContext();

	const icons = {
		info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>`,
		success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
		warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
		error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
		close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
	};

	const enableInteractive = $derived(theme.interactiveGlass && !theme.reducedMotion);
</script>

<div class="toast-container">
	{#each toasts as t (t.id)}
		{#if enableInteractive}
			<div
				use:liquidGlass
				class="toast-wrapper glass-heavy"
				transition:glassSlide={{ duration: 350, x: 300, blur: 4 }}
				data-depth="5"
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
		{:else}
			<div
				class="toast-wrapper glass-heavy"
				transition:glassSlide={{ duration: 350, x: 300, blur: 4 }}
				data-depth="5"
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
		{/if}
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: var(--z-toast);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 24rem;
		pointer-events: none;
	}

	.toast-wrapper {
		pointer-events: auto;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.toast-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem;
		color: var(--waku-fg-base);
	}

	.icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.toast-info .icon {
		color: var(--color-info);
	}

	.toast-success .icon {
		color: var(--color-success);
	}

	.toast-warning .icon {
		color: var(--color-warning);
	}

	.toast-error .icon {
		color: var(--color-danger);
	}

	.title {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.25rem;
		margin: 0;
	}

	.description {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--waku-fg-muted);
		margin: 0;
		margin-top: 0.125rem;
	}

	.grow {
		flex: 1;
	}

	.close-button {
		flex-shrink: 0;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--waku-fg-muted);
		transition: color var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
	}

	.close-button:hover {
		color: var(--waku-fg-base);
	}

	.close-button:active {
		transform: scale(0.95);
	}
</style>
