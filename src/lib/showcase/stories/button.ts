import type { ComponentStory } from '../types.js';
import Button from '$lib/components/Button.svelte';

export const buttonStory: ComponentStory = {
	component: Button,
	name: 'Button',
	description: 'Interactive button component with multiple variants, sizes, and states.',
	importPath: '$lib',
	category: 'component',
	props: [
		{
			name: 'variant',
			type: 'variant',
			default: 'primary',
			description: 'Visual style of the button',
			options: ['primary', 'subtle', 'outline', 'ghost', 'danger']
		},
		{
			name: 'size',
			type: 'size',
			default: 'md',
			description: 'Size of the button',
			options: ['sm', 'md', 'lg']
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: false,
			description: 'Whether the button is disabled'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional CSS classes'
		},
		{
			name: 'onclick',
			type: 'function',
			description: 'Click event handler'
		}
	],
	examples: [
		{
			name: 'Primary Button',
			description: 'Default primary button for main actions',
			props: {
				variant: 'primary'
			},
			slots: {
				default: 'Click Me'
			}
		},
		{
			name: 'All Variants',
			description: 'Available button variants',
			props: {
				variant: 'subtle'
			},
			slots: {
				default: 'Subtle Button'
			}
		},
		{
			name: 'Sizes',
			description: 'Button size options',
			props: {
				variant: 'primary',
				size: 'sm'
			},
			slots: {
				default: 'Small'
			}
		},
		{
			name: 'Disabled State',
			description: 'Button in disabled state',
			props: {
				variant: 'primary',
				disabled: true
			},
			slots: {
				default: 'Disabled'
			}
		},
		{
			name: 'Danger Variant',
			description: 'For destructive actions',
			props: {
				variant: 'danger'
			},
			slots: {
				default: 'Delete'
			}
		}
	]
};
