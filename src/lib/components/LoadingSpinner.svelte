<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}
	let { size = 'md', class: className }: Props = $props();
</script>

<div role="status" class="spinner spinner-{size} {className || ''}">
	<span class="sr-only">...</span>
</div>
