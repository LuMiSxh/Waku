<script lang="ts">
	import { VStack, HStack } from '$lib/layout/index.js';
	import type { Spacing, Alignment, Justification } from '$lib/types/index.js';

	const gaps: Spacing[] = ['xs', 'sm', 'md', 'lg', 'xl'];
	const alignments: Alignment[] = ['start', 'center', 'end', 'stretch'];
	const justifications: Justification[] = ['start', 'center', 'end', 'between', 'around', 'evenly'];
</script>

<div class="space-y-12">
	<!-- Hero Section -->
	<section>
		<h2 class="mb-2 text-3xl font-bold">Stack, VStack & HStack</h2>
		<p style="color: var(--waku-fg-muted);">
			Flexible layout components for arranging items in a vertical or horizontal stack.
		</p>
	</section>

	<!-- Default Stacks -->
	<section class="demo-section glass">
		<h3 class="demo-title">Default Stacks</h3>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<div>
				<h4 class="mb-2 font-medium">VStack (default)</h4>
				<VStack class="demo-container p-4">
					<div class="demo-item">Item 1</div>
					<div class="demo-item">Item 2</div>
					<div class="demo-item">Item 3</div>
				</VStack>
			</div>
			<div>
				<h4 class="mb-2 font-medium">HStack</h4>
				<HStack class="demo-container p-4">
					<div class="demo-item">Item 1</div>
					<div class="demo-item">Item 2</div>
					<div class="demo-item">Item 3</div>
				</HStack>
			</div>
		</div>
	</section>

	<!-- Gap Property -->
	<section class="demo-section glass">
		<h3 class="demo-title">Gap Spacing</h3>
		<VStack gap="lg">
			{#each gaps as gap (gap)}
				<div class="flex items-center">
					<span class="w-12 font-mono text-sm">{gap}</span>
					<HStack {gap} class="demo-container w-full p-2">
						<div class="demo-item h-8 w-16"></div>
						<div class="demo-item h-8 w-16"></div>
						<div class="demo-item h-8 w-16"></div>
					</HStack>
				</div>
			{/each}
		</VStack>
	</section>

	<!-- Alignment -->
	<section class="demo-section glass">
		<h3 class="demo-title">Alignment (`align`)</h3>
		<VStack gap="lg">
			{#each alignments as align (align)}
				<div>
					<h4 class="mb-2 font-medium capitalize">{align}</h4>
					<HStack {align} class="demo-container h-32 w-full p-4">
						<div class="demo-item h-8">Item</div>
						<div class="demo-item h-16">Item</div>
						<div class="demo-item h-12">Item</div>
					</HStack>
				</div>
			{/each}
		</VStack>
	</section>

	<!-- Justification -->
	<section class="demo-section glass">
		<h3 class="demo-title">Justification (`justify`)</h3>
		<VStack gap="lg">
			{#each justifications as justify (justify)}
				<div class="w-full">
					<h4 class="mb-2 font-medium capitalize">{justify}</h4>
					<HStack {justify} class="demo-container w-full p-4">
						<div class="demo-item">Item 1</div>
						<div class="demo-item">Item 2</div>
						<div class="demo-item">Item 3</div>
					</HStack>
				</div>
			{/each}
		</VStack>
	</section>

	<!-- Nesting & Depth (NEW EXAMPLE) -->
	<section class="demo-section glass">
		<h3 class="demo-title">Nesting & Depth</h3>
		<p class="mb-6 max-w-2xl" style="color: var(--waku-fg-muted);">
			Create depth by nesting stacks with different background layers, shadows, and padding. This
			creates a clear visual hierarchy.
		</p>

		<!-- Level 0: The page background -->
		<!-- Level 1: Main Card Container -->
		<VStack
			gap="md"
			class="demo-container glass rounded-lg border p-4 shadow-lg"
			style="background: var(--waku-bg-layer-1); border-color: var(--waku-border);"
		>
			<!-- Header -->
			<HStack justify="between" align="center" class="w-full">
				<div class="demo-item bg-accent-300!">Header</div>
				<div class="demo-item h-8 w-8 rounded-full bg-neutral-300! p-0 text-neutral-900!">AV</div>
			</HStack>

			<!-- Body -->
			<!-- Level 2: An inner, visually distinct container -->
			<VStack
				gap="sm"
				class="demo-container w-full rounded p-4"
				style="background: var(--waku-bg-layer-2);"
			>
				<div class="demo-item w-full bg-accent-100!">Nested Item A</div>
				<div class="demo-item w-full bg-accent-100!">Nested Item B</div>
			</VStack>

			<!-- Footer -->
			<HStack justify="end" class="w-full">
				<div class="demo-item bg-neutral-200! text-neutral-800!">Cancel</div>
				<div class="demo-item bg-accent-400! text-white!">Confirm</div>
			</HStack>
		</VStack>
	</section>

	<!-- Usage Example -->
	<section
		class="demo-section rounded-lg border p-6"
		style="border-color: var(--waku-border); background: var(--waku-bg-layer-1);"
	>
		<h3 class="demo-title">Usage</h3>
		<pre class="overflow-x-auto rounded-md p-4" style="background: var(--neutral-100);"><code
				>{`<script>
  import { VStack, HStack } from '@waku/layout';
</script>

<VStack gap="sm" align="center">
  <p>Item 1</p>
  <p>Item 2</p>
</VStack>

<HStack gap="lg" justify="between" class="w-full">
  <span>Left</span>
  <span>Right</span>
</HStack>
`}</code
			></pre>
	</section>
</div>
