<script lang="ts" generics="T">
	import { clickOutside, portalled, glassScale } from '$lib/actions/index.js';
	import { IconChevronDown } from '@tabler/icons-svelte';

	export type SelectOption<T> = {
		value: T;
		label: string;
	};

	interface Props<T> {
		options: SelectOption<T>[];
		value?: T;
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		id?: string;
		css?: string;
		style?: 'default' | 'seamless';
	}

	let {
		options,
		value = $bindable(),
		placeholder = 'Select an option...',
		disabled = false,
		class: className,
		css = '',
		style = 'default',
		id,
	}: Props<T> = $props();

	let open = $state(false);
	let highlightedIndex = $state(-1);
	let triggerElement: HTMLButtonElement | undefined = $state();

	// States for positioning
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

		// Add scroll offsets to support scrolled pages
		const scrollX = window.scrollX || document.documentElement.scrollLeft;
		const scrollY = window.scrollY || document.documentElement.scrollTop;

		top = rect.bottom + scrollY + 4;
		left = rect.left + scrollX;
		width = rect.width;
	}

	function selectOption(option: SelectOption<T>) {
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

<div
	class="select-wrapper {className || ''}"
	use:clickOutside={{
		handler: () => (open = false),
		ignore: [id || 'select-trigger'],
	}}
>
	<button
		type="button"
		class="select-trigger variant-{style}"
		bind:this={triggerElement}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
		{disabled}
		aria-haspopup="listbox"
		aria-expanded={open}
		tabindex={disabled ? -1 : 0}
		id={id || 'select-trigger'}
		style={css}
	>
		<span class:placeholder={!selectedLabel}>{selectedLabel || placeholder}</span>
		<div class="chevron">
			<IconChevronDown size={16} stroke={2} />
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
