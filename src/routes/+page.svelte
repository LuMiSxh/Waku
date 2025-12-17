<script lang="ts">
	import { resolve } from '$app/paths';

	const showcases = [
		{
			name: 'Button',
			path: '/button' as const as '/',
			description: 'Interactive buttons with variants and sizes.',
		},
		{
			name: 'Stack',
			path: '/stack' as const as '/',
			description: 'VStack and HStack for easy layouts.',
		},
		{
			name: 'Card',
			path: '/card' as const as '/',
			description: 'An elevated container for grouping content.',
		},
		{
			name: 'Bento Layout',
			path: '/bento',
			description: 'Modular grid system for dashboards.',
		},
		{
			name: 'Separator',
			path: '/separator' as const as '/',
			description: 'A line to visually divide content.',
		},
		{
			name: 'Elevation',
			path: '/elevation' as const as '/',
			description: 'Different colors depending on Stack elevation levels.',
		},
		{
			name: 'Badge',
			path: '/badge' as const as '/',
			description: 'Labels for statuses or properties.',
		},
		{
			name: 'Loading Spinner',
			path: '/loading-spinner' as const as '/',
			description: 'A visual loading indicator.',
		},
		{ name: 'Alert', path: '/alert' as const as '/', description: 'Prominent messages for users.' },
		{ name: 'Input', path: '/input' as const as '/', description: 'A standard form input field.' },
		{
			name: 'Label',
			path: '/label',
			description: 'Typography helper for layouts.',
		},
		{
			name: 'Toggle',
			path: '/toggle' as const as '/',
			description: 'A switch for boolean states.',
		},
		{
			name: 'Select',
			path: '/select' as const as '/',
			description: 'A custom dropdown selection component.',
		},
		{
			name: 'Tooltip',
			path: '/tooltip' as const as '/',
			description: 'A small pop-up label for extra info.',
		},
		{
			name: 'Modal',
			path: '/modal' as const as '/',
			description: 'A dialog window over the main content.',
		},
		{
			name: 'Toast',
			path: '/toast' as const as '/',
			description: 'Transient notifications to inform users.',
		},
	];

	const tools = [
		{
			name: 'Icon Creator',
			path: '/icon-creator',
			description: 'Create beautiful macOS-style app icons with Waku aesthetics.',
		},
	];
</script>

<div class="space-y-8">
	<section>
		<h2 class="mb-4 text-4xl font-bold">Waku Component Library</h2>
		<p style="color: var(--waku-fg-muted);" class="text-lg">
			A modern SvelteKit component library with flexible theming and dark mode support.
		</p>
	</section>

	<section>
		<h3 class="mb-6 text-2xl font-semibold">Interactive Tools</h3>
		<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
			{#each tools as item (item.path)}
				<a
					href={resolve(item.path as '/')}
					class="glass block rounded-lg p-6 transition-all hover:shadow-lg"
					style="background: linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%); border: 1px solid var(--waku-border);"
				>
					<h4 class="mb-2 text-xl font-semibold" style="color: white;">{item.name}</h4>
					<p style="color: rgba(255, 255, 255, 0.9);">{item.description}</p>
				</a>
			{/each}
		</div>
	</section>

	<section>
		<h3 class="mb-6 text-2xl font-semibold">V1 Component Showcases</h3>
		<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
			{#each showcases as item (item.path)}
				<a
					href={resolve(item.path)}
					class="glass block rounded-lg p-6 transition-all hover:shadow-lg"
					style="background: var(--waku-surface-1); border: 1px solid var(--waku-border);"
				>
					<h4 class="mb-2 text-xl font-semibold">{item.name}</h4>
					<p style="color: var(--waku-fg-muted);">{item.description}</p>
				</a>
			{/each}
		</div>
	</section>
	<section
		class="rounded-lg p-6"
		style="background: var(--color-surface); border: 1px solid var(--color-border);"
	>
		<h3 class="mb-4 text-2xl font-semibold">Getting Started</h3>
		<pre class="overflow-x-auto rounded-md p-4" style="background: var(--neutral-100);"><code
				>{`// Import styles in your app.css
@import "@waku/styles/waku.css";

:root {
  --accent-500: oklch(0.65 0.2 280);
}

// Use components
import { Button } from '@waku/components';

<Button variant="primary">Click Me</Button>`}</code
			></pre>
	</section>
</div>

<style>
	.space-y-8 > :global(* + *) {
		margin-top: 2rem;
	}
</style>
