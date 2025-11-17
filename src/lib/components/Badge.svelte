<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		children: Snippet;
		variant?: Variant;
		class?: string;
	}

	let { children, variant = 'default', class: className }: Props = $props();
</script>

<span class="badge badge-{variant} {className || ''}">
	{@render children()}
</span>
