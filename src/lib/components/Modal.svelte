<script lang="ts">
	import { clickOutside, focusTrap, portalled, glassScale, backdrop } from '$lib/actions/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		children: Snippet;
		onclose?: () => void;
		size?: 'sm' | 'md' | 'lg';
	}

	let { open = $bindable(), children, onclose, size = 'md' }: Props = $props();

	const sizeMap = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl'
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
</script>

<svelte:window on:keydown={handleKeydown} />

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
				<div
					class="modal-content glass-heavy {sizeMap[size]}"
					transition:glassScale={{ duration: 400, start: 0.95 }}
				>
					{@render children()}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-container {
		display: contents;
	}
</style>
