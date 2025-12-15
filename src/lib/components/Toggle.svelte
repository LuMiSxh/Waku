<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'success' | 'danger';
	type Style = 'default' | 'seamless';

	interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'style'> {
		checked?: boolean;
		disabled?: boolean;
		variant?: Variant;
		style?: Style;
		class?: string;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		variant = 'primary',
		style = 'default',
		class: className = '',
		...rest
	}: Props = $props();

	const colorMap = {
		primary: 'var(--waku-accent)',
		success: 'var(--color-success)',
		danger: 'var(--color-danger)',
	};

	let focused = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'Enter') {
			e.preventDefault();
			checked = !checked;
		}
	}

	function handleFocus() {
		focused = true;
	}

	function handleBlur() {
		focused = false;
	}
</script>

<label
	class="toggle-wrapper variant-{style} {className}"
	class:disabled
	class:focused
	style="--toggle-active-color: {colorMap[variant]};"
>
	<input
		type="checkbox"
		bind:checked
		{disabled}
		class="toggle-checkbox"
		role="switch"
		aria-checked={checked}
		tabindex="0"
		onkeydown={handleKeydown}
		onfocus={handleFocus}
		onblur={handleBlur}
		{...rest}
	/>
	<span class="toggle-track">
		<span class="toggle-thumb"></span>
	</span>
</label>

<style>
	.toggle-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		position: relative;
		width: fit-content;
	}

	.toggle-wrapper.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Checkbox overlays the track for proper focus */
	.toggle-checkbox {
		position: absolute;
		width: 44px;
		height: 24px;
		margin: 0;
		opacity: 0;
		cursor: pointer;
		z-index: 2;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	/* ----------------------------------------
	   DEFAULT STYLE
	   ---------------------------------------- */
	.variant-default .toggle-track {
		position: relative;
		width: 44px;
		height: 24px;
		background-color: oklch(from var(--waku-fg-base) l c h / 0.15);
		border-radius: var(--radius-full);
		transition: background-color 200ms ease-out;
		flex-shrink: 0;
	}

	.variant-default .toggle-thumb {
		position: absolute;
		height: 18px;
		width: 18px;
		left: 3px;
		top: 3px;
		background-color: white;
		border-radius: 50%;
		box-shadow: var(--shadow-sm);
		transition: transform 200ms var(--spring-smooth);
	}

	.variant-default .toggle-checkbox:checked ~ .toggle-track {
		background-color: var(--toggle-active-color);
	}

	.variant-default .toggle-checkbox:checked ~ .toggle-track .toggle-thumb {
		transform: translateX(20px);
	}

	.variant-default .toggle-checkbox:focus-visible ~ .toggle-track {
		outline: none;
		box-shadow:
			0 0 0 2px var(--waku-surface-0),
			0 0 0 4px var(--waku-accent);
	}

	/* ----------------------------------------
	   SEAMLESS STYLE
	   ---------------------------------------- */
	.variant-seamless .toggle-track {
		position: relative;
		width: 44px;
		height: 24px;
		background-color: oklch(from var(--waku-fg-base) l c h / 0.15);
		border-radius: var(--radius-full);
		transition: background-color 200ms ease-out;
		flex-shrink: 0;
	}

	.variant-seamless .toggle-thumb {
		position: absolute;
		height: 18px;
		width: 18px;
		left: 3px;
		top: 3px;
		background-color: white;
		border-radius: 50%;
		box-shadow: var(--shadow-sm);
		transition: transform 200ms var(--spring-smooth);
	}

	.variant-seamless .toggle-checkbox:checked ~ .toggle-track {
		background-color: var(--toggle-active-color);
	}

	.variant-seamless .toggle-checkbox:checked ~ .toggle-track .toggle-thumb {
		transform: translateX(20px);
	}

	.variant-seamless.focused {
		background-color: oklch(from var(--waku-accent) l c h / 0.08);
		padding: 0.25rem 0.5rem;
		margin: -0.25rem -0.5rem;
		border-radius: var(--radius-md);
		position: relative;
	}

	.variant-seamless.focused::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0.5rem;
		width: 44px;
		height: 2px;
		background-color: var(--waku-accent);
		border-radius: 1px;
	}

	.variant-seamless .toggle-checkbox:focus-visible ~ .toggle-track {
		outline: none;
		box-shadow: none;
	}

	/* Density-based sizes for seamless */
	:global([data-density='compact']) .variant-seamless .toggle-checkbox {
		width: 36px;
		height: 20px;
	}

	:global([data-density='compact']) .variant-seamless .toggle-track {
		width: 36px;
		height: 20px;
	}

	:global([data-density='compact']) .variant-seamless.focused::after {
		width: 36px;
	}

	:global([data-density='compact']) .variant-seamless .toggle-thumb {
		height: 14px;
		width: 14px;
	}

	:global([data-density='compact'])
		.variant-seamless
		.toggle-checkbox:checked
		~ .toggle-track
		.toggle-thumb {
		transform: translateX(16px);
	}

	:global([data-density='normal']) .variant-seamless .toggle-checkbox {
		width: 44px;
		height: 24px;
	}

	:global([data-density='normal']) .variant-seamless .toggle-track {
		width: 44px;
		height: 24px;
	}

	:global([data-density='normal']) .variant-seamless.focused::after {
		width: 44px;
	}

	:global([data-density='comfortable']) .variant-seamless .toggle-checkbox {
		width: 52px;
		height: 28px;
	}

	:global([data-density='comfortable']) .variant-seamless .toggle-track {
		width: 52px;
		height: 28px;
	}

	:global([data-density='comfortable']) .variant-seamless.focused::after {
		width: 52px;
	}

	:global([data-density='comfortable']) .variant-seamless .toggle-thumb {
		height: 22px;
		width: 22px;
	}

	:global([data-density='comfortable'])
		.variant-seamless
		.toggle-checkbox:checked
		~ .toggle-track
		.toggle-thumb {
		transform: translateX(24px);
	}
</style>
