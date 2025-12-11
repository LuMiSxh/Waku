<script lang="ts">
	import type { Size } from '$lib/types/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<Omit<HTMLInputElement, 'style'>> {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'search';
		disabled?: boolean;
		size?: Size;
		style?: 'default' | 'seamless';
		class?: string;
		css?: string;
		id?: string;
	}

	let {
		value = $bindable(),
		placeholder,
		type = 'text',
		disabled = false,
		size = 'md',
		style = 'default', // Default to standard look
		class: className,
		id,
		css = '',
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
		`input variant-${style} ${style === 'default' ? sizeMap[size] : ''} ${className || ''}`
	);
</script>

<input {id} bind:value {type} {placeholder} {disabled} class={classes} style={css} {...rest} />
