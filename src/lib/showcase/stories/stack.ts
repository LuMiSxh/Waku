import type { ComponentStory } from '../types.js';
import VStack from '$lib/layout/VStack.svelte';
import HStack from '$lib/layout/HStack.svelte';

export const vstackStory: ComponentStory = {
	component: VStack,
	name: 'VStack',
	description: 'Vertical stack layout component with automatic depth awareness.',
	importPath: '$lib/layout',
	category: 'layout',
	props: [
		{
			name: 'gap',
			type: 'spacing',
			default: 'md',
			description: 'Space between items',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
		},
		{
			name: 'align',
			type: 'alignment',
			description: 'Align items on cross axis',
			options: ['start', 'center', 'end', 'stretch']
		},
		{
			name: 'justify',
			type: 'justification',
			description: 'Justify items on main axis',
			options: ['start', 'center', 'end', 'between', 'around', 'evenly']
		},
		{
			name: 'elevation',
			type: 'elevation',
			description: 'Manual elevation override (0-2)',
			options: [0, 1, 2]
		},
		{
			name: 'noDepth',
			type: 'boolean',
			default: false,
			description: 'Disable automatic depth increment'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional CSS classes'
		}
	],
	examples: [
		{
			name: 'Basic VStack',
			description: 'Simple vertical stack with default spacing',
			props: {
				gap: 'md'
			},
			slots: {
				default: '<div>Item 1</div><div>Item 2</div><div>Item 3</div>'
			}
		},
		{
			name: 'Custom Gap',
			description: 'VStack with large gap',
			props: {
				gap: 'xl'
			},
			slots: {
				default: '<div>Item 1</div><div>Item 2</div>'
			}
		},
		{
			name: 'Centered Items',
			description: 'Items centered horizontally',
			props: {
				gap: 'md',
				align: 'center'
			},
			slots: {
				default: '<div>Centered Item 1</div><div>Centered Item 2</div>'
			}
		}
	]
};

export const hstackStory: ComponentStory = {
	component: HStack,
	name: 'HStack',
	description: 'Horizontal stack layout component with automatic depth awareness.',
	importPath: '$lib/layout',
	category: 'layout',
	props: [
		{
			name: 'gap',
			type: 'spacing',
			default: 'md',
			description: 'Space between items',
			options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
		},
		{
			name: 'align',
			type: 'alignment',
			description: 'Align items on cross axis',
			options: ['start', 'center', 'end', 'stretch']
		},
		{
			name: 'justify',
			type: 'justification',
			description: 'Justify items on main axis',
			options: ['start', 'center', 'end', 'between', 'around', 'evenly']
		},
		{
			name: 'elevation',
			type: 'elevation',
			description: 'Manual elevation override (0-2)',
			options: [0, 1, 2]
		},
		{
			name: 'noDepth',
			type: 'boolean',
			default: false,
			description: 'Disable automatic depth increment'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional CSS classes'
		}
	],
	examples: [
		{
			name: 'Basic HStack',
			description: 'Simple horizontal stack with default spacing',
			props: {
				gap: 'md'
			},
			slots: {
				default: '<div>Item 1</div><div>Item 2</div><div>Item 3</div>'
			}
		},
		{
			name: 'Space Between',
			description: 'Items distributed with space between',
			props: {
				gap: 'md',
				justify: 'between'
			},
			slots: {
				default: '<div>Left</div><div>Center</div><div>Right</div>'
			}
		},
		{
			name: 'Vertically Centered',
			description: 'Items centered vertically',
			props: {
				gap: 'sm',
				align: 'center'
			},
			slots: {
				default: '<div style="height: 40px">Tall</div><div>Short</div>'
			}
		}
	]
};
