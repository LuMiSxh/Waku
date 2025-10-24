<script lang="ts">
	import { clickOutside, focusTrap, portalled } from '$lib/actions/index.js';
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition'; // Import transitions

	interface Props {
		open?: boolean;
		children: Snippet;
		onclose?: () => void;
	}

	let { open = $bindable(), children, onclose }: Props = $props();

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
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div use:portalled>
		<div class="backdrop" transition:fade={{ duration: 200 }}>
			<div
				class="modal-container"
				role="dialog"
				aria-modal="true"
				use:focusTrap={[open, true]}
				use:clickOutside={handleClose}
			>
				<div class="modal-content glass" transition:fly={{ y: 20, duration: 200, opacity: 0 }}>
					{@render children()}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		background-color: var(--waku-backdrop-bg);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-content {
		max-width: 500px;
		width: calc(100vw - 2rem);
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background-color: var(--waku-bg-layer-2);
		border: 1px solid var(--waku-border);
		box-shadow: var(--shadow-xl);
	}
</style>
