<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		children: Snippet;
		variant?: Variant;
		class?: string;
	}

	let { children, variant = 'secondary', class: className }: Props = $props();
</script>

<span class="badge {variant} {className || ''}">
	{@render children()}
</span>
