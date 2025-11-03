<script lang="ts">
	import type { Snippet } from 'svelte';
	import { glassScale, portalled } from '$lib/actions/index.js';

	interface Props {
		children: Snippet;
		text: string;
		class?: string;
	}
	let { children, text, class: className }: Props = $props();

	let visible = $state(false);
	let triggerEl: HTMLElement;
	let tooltipEl: HTMLElement | null = $state(null);

	const show = () => (visible = true);
	const hide = () => (visible = false);

	$effect(() => {
		if (visible && triggerEl && tooltipEl) {
			const triggerRect = triggerEl.getBoundingClientRect();
			const tooltipRect = tooltipEl.getBoundingClientRect();
			const gap = 8; // 8px gap

			let top = triggerRect.top - tooltipRect.height - gap;
			let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

			tooltipEl.style.top = `${top}px`;
			tooltipEl.style.left = `${left}px`;
		}
	});
</script>

<div
	bind:this={triggerEl}
	class="tooltip-container {className || ''}"
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
	role="tooltip"
>
	{@render children()}

	{#if visible}
		<div
			bind:this={tooltipEl}
			class="tooltip"
			use:portalled
			transition:glassScale={{ duration: 400, start: 0.95 }}
			style="position: absolute;"
		>
			{text}
		</div>
	{/if}
</div>
