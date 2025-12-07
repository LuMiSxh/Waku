<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'success' | 'danger';

	interface Props extends HTMLAttributes<HTMLInputElement> {
		checked?: boolean;
		disabled?: boolean;
		variant?: Variant;
		class?: string;
		onclick?: HTMLAttributes<HTMLInputElement>['onclick'];
		onkeydown?: HTMLAttributes<HTMLInputElement>['onkeydown'];
		tabindex?: HTMLAttributes<HTMLInputElement>['tabindex'];
	}

	let {
		checked = $bindable(),
		disabled = false,
		variant = 'primary',
		class: className,
		onclick,
		onkeydown,
		tabindex,
		...rest
	}: Props = $props();

	// Farb-Mapping für die CSS-Variable
	const colorMap = {
		primary: 'var(--waku-accent)',
		success: 'var(--color-success)',
		danger: 'var(--color-danger)',
	};
</script>

<label
	class="toggle {className || ''}"
	class:disabled
	style="--toggle-bg-active: {colorMap[variant]};"
>
	<input
		type="checkbox"
		bind:checked
		{disabled}
		{onclick}
		{onkeydown}
		{tabindex}
		class="toggle-input"
		role="switch"
		aria-checked={checked}
		{...rest}
	/>
	<span class="toggle-slider"></span>
</label>

<style>
	.toggle.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
