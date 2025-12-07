<script lang="ts">
	import type { Size } from '$lib/types/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLInputElement> {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'search';
		disabled?: boolean;
		size?: Size;
		variant?: 'default' | 'seamless';
		class?: string;
		id?: string;
	}

	let {
		value = $bindable(),
		placeholder,
		type = 'text',
		disabled = false,
		size = 'md',
		variant = 'default', // Default to standard look
		class: className,
		id,
		...rest
	}: Props = $props();

	// Only apply size classes if we are in default mode.
	// Seamless mode handles its own sizing (auto height).
	const sizeMap = {
		sm: 'h-8 px-2 text-sm',
		md: 'h-10 px-3 text-base',
		lg: 'h-12 px-4 text-lg',
	};

	// Determine classes
	let classes = $derived(
		`input variant-${variant} ${variant === 'default' ? sizeMap[size] : ''} ${className || ''}`
	);
</script>

<input {id} bind:value {type} {placeholder} {disabled} class={classes} {...rest} />
