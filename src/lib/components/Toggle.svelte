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
</script>

<label class="toggle-wrapper {variant} {className || ''}">
	<input type="checkbox" bind:checked {disabled} class="sr-only" />
	<div class="track">
		<div class="thumb"></div>
	</div>
</label>

<style>
	.toggle-wrapper {
		display: inline-flex;
		cursor: pointer;
	}
	.track {
		position: relative;
		width: 2.75rem;
		height: 1.5rem;
		border-radius: 9999px;
		background-color: var(--neutral-300);
		transition: background-color var(--transition-fast);
	}
	.thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background-color: white;
		transition: transform var(--transition-fast);
	}

	/* Variant Colors */
	.primary input:checked + .track {
		background-color: var(--waku-accent);
	}
	.success input:checked + .track {
		background-color: var(--color-success);
	}
	.danger input:checked + .track {
		background-color: var(--color-danger);
	}

	input:checked + .track > .thumb {
		transform: translateX(1.25rem);
	}

	input:focus-visible + .track {
		outline: 2px solid var(--waku-accent);
		outline-offset: 2px;
	}

	/* Disabled State */
	:global(.toggle-wrapper[disabled]),
	input:disabled + .track {
		opacity: 0.6;
	}
</style>
