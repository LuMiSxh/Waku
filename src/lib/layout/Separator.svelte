<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		class?: string;
	}

	let { orientation = 'horizontal', class: className }: Props = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	class="separator {orientation} {className || ''}"
></div>

<style>
	.separator {
		background-color: var(--waku-border);
	}
	.separator.horizontal {
		height: 1px;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.separator.vertical {
		width: 1px;
		height: 100%;
		margin-left: 1rem;
		margin-right: 1rem;
	}
</style>
