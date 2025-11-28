<script lang="ts">
	import { clickOutside, portalled, glassScale } from '$lib/actions/index.js';

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
		variant?: 'default' | 'seamless';
	}

	let {
		options,
		value = $bindable(),
		placeholder = 'Select an option...',
		disabled = false,
		class: className,
		variant = 'default',
		id
	}: Props = $props();

	let open = $state(false);
	let highlightedIndex = $state(-1);
	let triggerElement: HTMLButtonElement | undefined = $state();

	// State für die Positionierung
	let top = $state(0);
	let left = $state(0);
	let width = $state(0);

	let selectedLabel = $derived.by(() => {
		const selectedOption = options.find((opt) => opt.value === value);
		return selectedOption ? selectedOption.label : '';
	});

	function updatePosition() {
		if (!triggerElement) return;
		const rect = triggerElement.getBoundingClientRect();

		top = rect.bottom + 4;
		left = rect.left;
		width = rect.width;
	}

	function selectOption(option: SelectOption) {
		value = option.value;
		open = false;
		highlightedIndex = -1;
		triggerElement?.focus();
	}

	function syncHighlight() {
		const idx = options.findIndex((o) => o.value === value);
		highlightedIndex = idx >= 0 ? idx : 0;
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (disabled) return;

		if (open) {
			if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
				e.preventDefault();
			}
			if (e.key === 'Tab') open = false;
			return;
		}

		switch (e.key) {
			case 'Enter':
			case ' ':
			case 'ArrowDown':
			case 'ArrowUp':
				e.preventDefault();
				e.stopPropagation();

				updatePosition();
				syncHighlight();
				open = true;
				break;
		}
	}

	function handleTriggerClick() {
		if (disabled) return;

		if (!open) {
			updatePosition();
			syncHighlight();
			open = true;
		} else {
			// Wir schließen
			open = false;
		}
	}

	function handleListKeydown(e: KeyboardEvent) {
		if (!open) return;

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				e.stopPropagation();
				open = false;
				triggerElement?.focus();
				break;
			case 'ArrowDown':
				e.preventDefault();
				highlightedIndex = (highlightedIndex + 1) % options.length;
				scrollOptionIntoView(highlightedIndex);
				break;
			case 'ArrowUp':
				e.preventDefault();
				highlightedIndex = (highlightedIndex - 1 + options.length) % options.length;
				scrollOptionIntoView(highlightedIndex);
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				e.stopPropagation();
				if (highlightedIndex >= 0 && options[highlightedIndex]) {
					selectOption(options[highlightedIndex]);
				}
				break;
		}
	}

	function scrollOptionIntoView(index: number) {
		const listId = `listbox-${id || 'select'}`;
		const list = document.getElementById(listId);
		const item = list?.children[index] as HTMLElement;
		item?.scrollIntoView({ block: 'nearest' });
	}

	$effect(() => {
		if (open) {
			updatePosition();
		}
	});
</script>

<svelte:window onresize={updatePosition} onscroll={updatePosition} onkeydown={handleListKeydown} />

<div class="select-wrapper {className || ''}" use:clickOutside={() => (open = false)}>
	<button
		type="button"
		class="select-trigger variant-{variant}"
		bind:this={triggerElement}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
		{disabled}
		aria-haspopup="listbox"
		aria-expanded={open}
		tabindex={disabled ? -1 : 0}
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
				id={`listbox-${id || 'select'}`}
				class="options-list glass-heavy"
				role="listbox"
				style="position: absolute; top: {top}px; left: {left}px; width: {width}px;"
				transition:glassScale={{ duration: 200, start: 0.95 }}
			>
				{#each options as option, i (option.value)}
					<li
						role="option"
						aria-selected={i === highlightedIndex}
						class:highlighted={i === highlightedIndex}
						class:selected={value === option.value}
						onclick={() => selectOption(option)}
						onmouseenter={() => (highlightedIndex = i)}
						onkeydown={() => {}}
					>
						{option.label}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
