<script lang="ts">
	type Variant = 'primary' | 'success' | 'danger';

	interface Props {
		checked?: boolean;
		disabled?: boolean;
		variant?: Variant;
		class?: string;
	}

	let {
		checked = $bindable(),
		disabled = false,
		variant = 'primary',
		class: className
	}: Props = $props();

	// Farb-Mapping für die CSS-Variable
	const colorMap = {
		primary: 'var(--waku-accent)',
		success: 'var(--color-success)',
		danger: 'var(--color-danger)'
	};
</script>

<label
	class="toggle {className || ''}"
	class:disabled
	style="--toggle-bg-active: {colorMap[variant]};"
>
	<input type="checkbox" bind:checked {disabled} class="toggle-input" role="switch" />
	<span class="toggle-slider"></span>
</label>

<style>
	.toggle.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
