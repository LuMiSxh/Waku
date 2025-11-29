<script lang="ts">
	import { Button, HStack, VStack } from '$lib/index.js';
	import type { Variant, Size } from '$lib/types/index.js';

	const variants: Variant[] = ['primary', 'sublte', 'outline', 'ghost', 'danger'];
	const sizes: Size[] = ['sm', 'md', 'lg'];
</script>

<div class="space-y-12">
	<!-- Hero Section -->
	<section>
		<h2 class="mb-2 text-3xl font-bold">Button</h2>
		<p style="color: var(--waku-fg-muted);">Interactive button with multiple variants and sizes.</p>
	</section>

	<!-- Variants -->
	<section class="demo-section glass">
		<h3 class="demo-title">Variants</h3>
		<HStack gap="md">
			{#each variants as variant (variant)}
				<Button {variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
			{/each}
		</HStack>
	</section>

	<!-- Sizes -->
	<section class="demo-section glass">
		<h3 class="demo-title">Sizes</h3>
		<HStack gap="md" align="end">
			{#each sizes as size (size)}
				<Button variant="primary" {size}>{size.toUpperCase()}</Button>
			{/each}
		</HStack>
	</section>

	<!-- Disabled State -->
	<section class="demo-section glass">
		<h3 class="demo-title">Disabled State</h3>
		<HStack gap="md">
			{#each variants as variant (variant)}
				<Button {variant} disabled>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
			{/each}
		</HStack>
	</section>

	<!-- All Combinations -->
	<section class="demo-section glass">
		<h3 class="demo-title">All Combinations</h3>
		<VStack gap="lg" align="stretch">
			{#each variants as variant (variant)}
				<div class="demo-container p-4">
					<HStack gap="md" align="center">
						<span class="w-24 shrink-0 font-medium capitalize">{variant}</span>
						<div class="h-8 border-l" style="border-color: var(--waku-border);"></div>
						{#each sizes as size (size)}
							<Button {variant} {size}>{size.toUpperCase()}</Button>
						{/each}
						<Button {variant} disabled>Disabled</Button>
					</HStack>
				</div>
			{/each}
		</VStack>
	</section>
</div>

<style>
	.demo-section {
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		border: 1px solid var(--waku-border);
		background: var(--waku-surface-1);
	}
	.demo-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	.demo-container {
		border-radius: var(--radius-md);
	}
	.space-y-12 > * + * {
		margin-top: 3rem;
	}
</style>
