/**
 * Component Showcase System
 * Automatic documentation generation similar to Storybook
 */

import type { ComponentType } from 'svelte';

export type PropType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'function'
	| 'snippet'
	| 'variant'
	| 'size'
	| 'elevation'
	| 'spacing'
	| 'alignment'
	| 'justification';

export interface PropDefinition {
	name: string;
	type: PropType;
	default?: unknown;
	required?: boolean;
	description?: string;
	options?: readonly unknown[];
}

export interface ComponentExample {
	name: string;
	description?: string;
	props: Record<string, unknown>;
	slots?: {
		default?: string;
		[key: string]: string | undefined;
	};
}

export interface ComponentStory {
	component: ComponentType;
	name: string;
	description: string;
	props: PropDefinition[];
	examples: ComponentExample[];
	importPath: string;
	category?: 'component' | 'layout' | 'action';
}

export interface ShowcaseConfig {
	stories: ComponentStory[];
	theme?: {
		accent?: string;
		darkMode?: boolean;
	};
}
