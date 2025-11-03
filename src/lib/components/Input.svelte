<script lang="ts">
	import type { Size } from '$lib/types/index.js';

	interface Props {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'search';
		disabled?: boolean;
		size?: Size;
		class?: string;
	}

	let {
		value = $bindable(),
		placeholder,
		type = 'text',
		disabled = false,
		size = 'md',
		class: className
	}: Props = $props();

	const sizeMap = {
		sm: 'h-8 px-2 text-sm',
		md: 'h-10 px-3 text-base',
		lg: 'h-12 px-4 text-lg'
	};
</script>

<input bind:value {type} {placeholder} {disabled} class="input {sizeMap[size]} {className || ''}" />
