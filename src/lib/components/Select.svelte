<script lang="ts">
	import { clickOutside, portalled } from '$lib/actions/index.js';
	import { fly } from 'svelte/transition';

	export type SelectOption = {
		value: string | number;
		label: string;
	};

	interface Props {
		options: SelectOption[];
		value?: string | number;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		id?: string;
	}

	let {
		options,
		value = $bindable(),
		placeholder = 'Select an option...',
		disabled = false,
		class: className,
		id
	}: Props = $props();

	let open = $state(false);
	let highlightedIndex = $state(-1);
	let listboxElement: HTMLUListElement | undefined = $state();
	let triggerElement: HTMLButtonElement | undefined = $state(); // Reference to the trigger button

	// State for portalled positioning
	let top = $state(0);
	let left = $state(0);
	let width = $state(0);

	const selectedLabel = $derived.by(() => {
		const selectedOption = options.find((opt) => opt.value === value);
		return selectedOption ? selectedOption.label : '';
	});

	function updatePosition() {
		if (!triggerElement) return;
		const rect = triggerElement.getBoundingClientRect();
		top = rect.bottom + 4; // Position below the trigger with a 4px gap
		left = rect.left;
		width = rect.width;
	}

	function selectOption(option: SelectOption) {
		value = option.value;
		open = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab' && open) {
			open = false;
			return;
		}
		if (!open) {
			if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
				event.preventDefault();
				open = true;
			}
			return;
		}

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				open = false;
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (highlightedIndex >= 0) selectOption(options[highlightedIndex]);
				break;
			case 'ArrowDown':
				event.preventDefault();
				highlightedIndex = Math.min(options.length - 1, highlightedIndex + 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				highlightedIndex = Math.max(0, highlightedIndex - 1);
				break;
			case 'Home':
				event.preventDefault();
				highlightedIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				highlightedIndex = options.length - 1;
				break;
		}
	}

	$effect(() => {
		if (open) {
			updatePosition(); // Calculate position when opened
			// Set initial highlighted item
			const currentIndex = options.findIndex((opt) => opt.value === value);
			highlightedIndex = currentIndex !== -1 ? currentIndex : 0;
		}
	});

	$effect(() => {
		if (listboxElement && highlightedIndex >= 0) {
			const optionEl = listboxElement.children[highlightedIndex];
			optionEl?.scrollIntoView({ block: 'nearest' });
		}
	});
</script>

<svelte:window on:resize={updatePosition} on:scroll={updatePosition} />

<div class="select-wrapper {className || ''}" use:clickOutside={() => (open = false)}>
	<button
		type="button"
		class="select-trigger"
		bind:this={triggerElement}
		onclick={() => (open = !open)}
		onkeydown={handleKeydown}
		{disabled}
		aria-haspopup="listbox"
		aria-expanded={open}
		{id}
	>
		<span class:placeholder={!selectedLabel}>{selectedLabel || placeholder}</span>
		<div class="chevron">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
			>
		</div>
	</button>

	{#if open}
		<div use:portalled>
			<ul
				class="options-list glass"
				role="listbox"
				bind:this={listboxElement}
				style="top: {top}px; left: {left}px; width: {width}px;"
				transition:fly={{ y: -5, duration: 150 }}
			>
				{#each options as option, i (option.value)}
					<li
						role="option"
						aria-selected={value === option.value}
						class:highlighted={i === highlightedIndex}
						onclick={() => selectOption(option)}
						onmouseenter={() => (highlightedIndex = i)}
						onkeydown={handleKeydown}
					>
						{option.label}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.select-wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}
	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 2.5rem; /* h-10 */
		padding: 0 0.75rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--waku-border);
		background-color: var(--waku-bg-layer-1);
		color: var(--waku-fg-base);
		transition: border-color var(--transition-fast);
		text-align: left;
		cursor: pointer;
	}
	.select-trigger:focus {
		outline: none;
		border-color: var(--waku-accent);
	}
	.select-trigger:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
	.placeholder {
		color: var(--waku-fg-muted);
	}
	.chevron {
		color: var(--waku-fg-muted);
		transition: transform var(--transition-fast);
	}
	.select-trigger[aria-expanded='true'] .chevron {
		transform: rotate(180deg);
	}

	.options-list {
		position: fixed;
		z-index: var(--z-dropdown);
		max-height: 200px;
		overflow-y: auto;
		list-style: none;
		margin: 0;
		padding: 0.25rem;
		border-radius: var(--radius-md);
		background-color: var(--waku-bg-layer-2);
		border: 1px solid var(--waku-border);
		box-shadow: var(--shadow-lg);
	}

	.options-list li {
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		cursor: pointer;
		user-select: none;
	}

	.options-list li + li {
		margin-top: 0.05rem;
	}

	.options-list li[aria-selected='true'] {
		font-weight: 600;
		background-color: var(--accent-200);
		color: var(--accent-800);
	}

	.options-list li.highlighted {
		background-color: var(--accent-300);
		color: var(--accent-900);
		outline: none;
	}
</style>
