<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}
	let { size = 'md', class: className }: Props = $props();

	const sizeMap = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8'
	};
</script>

<div role="status" class="spinner {sizeMap[size]} {className || ''}">
	<span class="sr-only">Loading...</span>
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.spinner {
		animation: spin 0.8s linear infinite;
		border-radius: 50%;
		border: 2px solid var(--waku-border);
		border-top-color: var(--waku-accent);
	}
</style>
