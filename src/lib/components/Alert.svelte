<script lang="ts">
	import type { Snippet } from 'svelte';
	type Variant = 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		children: Snippet;
		variant?: Variant;
		class?: string;
		glass?: boolean;
	}
	let { children, variant = 'info', class: className, glass = false }: Props = $props();
</script>

<div role="alert" class="alert {variant} {glass ? 'glass-subtle' : ''} {className || ''}">
	{@render children()}
</div>
