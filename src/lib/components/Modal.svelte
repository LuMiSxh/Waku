<script lang="ts">
	import {
		clickOutside,
		focusTrap,
		portalled,
		glassScale,
		backdrop,
		premiumGlass
	} from '$lib/actions/index.js';
	import type { Snippet } from 'svelte';
	import { createNestedDepthContext, getThemeContext } from '$lib/context/theme.svelte.js';

	interface Props {
		open?: boolean;
		children: Snippet;
		onclose?: () => void;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		/**
		 * Disable interactive glass effects
		 */
		static?: boolean;
	}

	let { open = $bindable(), children, onclose, size = 'md', static: isStatic = false }: Props = $props();

	// Create depth context for modal (depth 4)
	const theme = getThemeContext();
	const modalContext = createNestedDepthContext();

	// Modals are always at depth 4 (overlay)
	$effect(() => {
		if (open) {
			modalContext.setDepth(4);
		}
	});

	const sizeMap = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl'
	};

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleClose() {
		if (onclose) onclose();
		else open = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open || event.key !== 'Escape') return;
		event.preventDefault();
		handleClose();
	}

	const enableInteractive = $derived(
		theme.interactiveGlass && !isStatic && !theme.reducedMotion
	);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div use:portalled>
		<div class="modal-backdrop" transition:backdrop={{ duration: 400 }}>
			<div
				class="modal-container"
				role="dialog"
				aria-modal="true"
				use:focusTrap={[open, true]}
				use:clickOutside={handleClose}
			>
				{#if enableInteractive}
					<div
						use:premiumGlass
						class="modal-content glass-thick {sizeMap[size]}"
						transition:glassScale={{ duration: 400, start: 0.95 }}
						data-depth="4"
					>
						{@render children()}
					</div>
				{:else}
					<div
						class="modal-content glass-thick {sizeMap[size]}"
						transition:glassScale={{ duration: 400, start: 0.95 }}
						data-depth="4"
					>
						{@render children()}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: var(--waku-backdrop-bg);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: var(--z-modal);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal-container {
		display: contents;
	}

	.modal-content {
		position: relative;
		width: 100%;
		padding: 2rem;
		border-radius: var(--radius-xl);
		max-height: 90vh;
		overflow-y: auto;
	}

	.max-w-md {
		max-width: 28rem;
	}

	.max-w-2xl {
		max-width: 42rem;
	}

	.max-w-4xl {
		max-width: 56rem;
	}

	.max-w-6xl {
		max-width: 72rem;
	}

	/* Smooth scrolling */
	.modal-content {
		scrollbar-width: thin;
		scrollbar-color: var(--waku-border) transparent;
	}

	.modal-content::-webkit-scrollbar {
		width: 8px;
	}

	.modal-content::-webkit-scrollbar-track {
		background: transparent;
	}

	.modal-content::-webkit-scrollbar-thumb {
		background-color: var(--waku-border);
		border-radius: var(--radius-full);
	}
</style>
