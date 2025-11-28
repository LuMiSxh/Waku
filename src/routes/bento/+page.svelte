<script lang="ts">
	import { BentoGrid, BentoItem, Separator } from '$lib/layout/index.js';
	import { Label, Input, Button, Select } from '$lib/components/index.js';

	let format: string | undefined = $state();

	let description = $derived.by(() => {
		switch (format) {
			case 'WebP':
				return 'High Efficiency';
			case 'AVIF':
				return 'Best Compression (Slower)';
			case 'JPEG':
				return 'Maximum Compatibility';
			default:
				return '';
		}
	});
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Bento Layout</h2>
		<p class="text-muted">
			A modular grid system for building dashboard-like interfaces with glass effects.
		</p>
	</section>

	<!-- DEMO 1: Form / Settings -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">1. Settings Layout (Dense)</h3>
		<BentoGrid cols={3}>
			<!-- Project Name (Span 2) -->
			<BentoItem colspan={2}>
				<Label text="Project Name" />
				<Input variant="seamless" value="Bleach Vol. 1-74" />
			</BentoItem>

			<!-- Interactive Action (Rowspan 2, Glass Highlight) -->
			<BentoItem
				rowspan={2}
				variant="glass"
				class="justify-between"
				onclick={() => alert('Browse clicked')}
			>
				<div>
					<Label text="Target Location" class="text-accent-500!" />
					<p class="text-sm break-all opacity-80">/Users/Luca/Manga/Output</p>
				</div>
				<Button class="w-full">Browse</Button>
			</BentoItem>

			<!-- Small configs  -->
			<BentoItem>
				<Label text="Format" />
				<Select
					variant="seamless"
					options={[
						{ value: 'CBZ', label: 'CBZ' },
						{ value: 'EPUB', label: 'EPUB' }
					]}
				/>
			</BentoItem>

			<BentoItem>
				<Label text="Compression" />
				<Select
					bind:value={format}
					variant="seamless"
					options={[
						{ value: 'WebP', label: 'WebP' },
						{ value: 'AVIF', label: 'AVIF' },
						{ value: 'JPEG', label: 'JPEG' }
					]}
				/>
				<p class="text-muted animate-fade-in text-xs">
					{description}
				</p>
			</BentoItem>
		</BentoGrid>
	</section>

	<Separator />

	<!-- DEMO 2: Stats / Read Only -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">2. Statistics Dashboard</h3>
		<BentoGrid cols={4}>
			<!-- Stat 1 -->
			<BentoItem variant="glass" class="items-center justify-center">
				<div class="text-4xl font-bold">74</div>
				<Label text="Volumes" class="mt-2 mb-0!" />
			</BentoItem>

			<!-- Stat 2 -->
			<BentoItem class="items-center justify-center">
				<div class="text-4xl font-bold">686</div>
				<Label text="Chapters" class="mt-2 mb-0!" />
			</BentoItem>

			<!-- Wide Graph (Span 2, Row 2) -->
			<BentoItem colspan={2} rowspan={2} padding="none">
				<div class="p-5 pb-0">
					<Label text="Distribution" />
				</div>
				<div class="flex h-full items-end gap-2 px-5 pb-5">
					<div class="h-2/5 flex-1 rounded-t bg-neutral-200 dark:bg-neutral-800"></div>
					<div class="h-3/5 flex-1 rounded-t bg-neutral-200 dark:bg-neutral-800"></div>
					<div class="h-1/2 flex-1 rounded-t bg-accent-500"></div>
					<div class="h-3/4 flex-1 rounded-t bg-neutral-200 dark:bg-neutral-800"></div>
				</div>
			</BentoItem>

			<!-- Issues (Alert Style) -->
			<BentoItem colspan={2} variant="danger" class="flex-row items-center justify-between">
				<div>
					<div class="text-danger font-bold">2 Issues Found</div>
					<div class="text-xs opacity-80">Missing covers in Vol 4, 12</div>
				</div>
				<div
					class="text-danger flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold shadow-sm"
				>
					!
				</div>
			</BentoItem>
		</BentoGrid>
	</section>
</div>
