<script lang="ts">
	import { resolve } from '$app/paths';

	const showcases = [
		{
			name: 'Button',
			path: '/button' as const as '/',
			description: 'Interactive buttons with variants and sizes.'
		},
		{
			name: 'Stack',
			path: '/stack' as const as '/',
			description: 'VStack and HStack for easy layouts.'
		},
		{
			name: 'Card',
			path: '/card' as const as '/',
			description: 'An elevated container for grouping content.'
		},
		{
			name: 'Separator',
			path: '/separator' as const as '/',
			description: 'A line to visually divide content.'
		},
		{
			name: 'Elevation',
			path: '/elevation' as const as '/',
			description: 'Different colors depending on Stack elevation levels.'
		},
		{
			name: 'Badge',
			path: '/badge' as const as '/',
			description: 'Labels for statuses or properties.'
		},
		{
			name: 'Loading Spinner',
			path: '/loading-spinner' as const as '/',
			description: 'A visual loading indicator.'
		},
		{ name: 'Alert', path: '/alert' as const as '/', description: 'Prominent messages for users.' },
		{ name: 'Input', path: '/input' as const as '/', description: 'A standard form input field.' },
		{
			name: 'Toggle',
			path: '/toggle' as const as '/',
			description: 'A switch for boolean states.'
		},
		{
			name: 'Select',
			path: '/select' as const as '/',
			description: 'A custom dropdown selection component.'
		},
		{
			name: 'Tooltip',
			path: '/tooltip' as const as '/',
			description: 'A small pop-up label for extra info.'
		},
		{
			name: 'Modal',
			path: '/modal' as const as '/',
			description: 'A dialog window over the main content.'
		},
		{
			name: 'Toast',
			path: '/toast' as const as '/',
			description: 'Transient notifications to inform users.'
		}
	];

	const newFeatures = [
		{
			name: 'Interactive Glass',
			path: '/interactive-glass' as const as '/',
			description: '✨ Liquid glass with reactive highlights, speckles, and cursor tracking.'
		},
		{
			name: 'Depth Showcase',
			path: '/showcase' as const as '/',
			description: '🎨 Automatic depth awareness and ThemeProvider demo.'
		}
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
		<h3 class="mb-6 text-2xl font-semibold">✨ New Features</h3>
		<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
			{#each newFeatures as item (item.path)}
				<a
					href={resolve(item.path)}
					class="glass-heavy block rounded-lg p-6 transition-all hover:shadow-lg"
					style="border: 1px solid oklch(from var(--waku-accent) l c h / 0.3);"
				>
					<h4 class="mb-2 text-xl font-semibold">{item.name}</h4>
					<p style="color: var(--waku-fg-muted);">{item.description}</p>
				</a>
			{/each}
		</div>
	</section>

	<section>
		<h3 class="mb-6 text-2xl font-semibold">Component Showcases</h3>
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
		style="background: var(--waku-surface-1); border: 1px solid var(--waku-border);"
	>
		<h3 class="mb-4 text-2xl font-semibold">Getting Started</h3>
		<div class="space-y-4">
			<div>
				<h4 class="text-lg font-semibold mb-2">1. Wrap your app with ThemeProvider</h4>
				<p class="text-muted text-sm">
					Add ThemeProvider to your root layout to enable depth awareness and set your accent color.
				</p>
			</div>
			<div>
				<h4 class="text-lg font-semibold mb-2">2. Components auto-style themselves</h4>
				<p class="text-muted text-sm">
					No manual elevation props needed! Components detect their depth and apply the appropriate
					styling automatically.
				</p>
			</div>
			<div>
				<h4 class="text-lg font-semibold mb-2">3. Explore the showcases</h4>
				<p class="text-muted text-sm">
					Click any component above to see interactive examples, prop documentation, and generated
					code snippets.
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.space-y-8 > :global(* + *) {
		margin-top: 2rem;
	}

	.space-y-4 > * + * {
		margin-top: 1rem;
	}

	.mb-2 {
		margin-bottom: 0.5rem;
	}

	.mb-4 {
		margin-bottom: 1rem;
	}

	.text-sm {
		font-size: 0.875rem;
	}

	.text-lg {
		font-size: 1.125rem;
	}
</style>
