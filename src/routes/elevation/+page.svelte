<script lang="ts">
	import { VStack, HStack, Card } from '$lib/layout/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Surface Elevation</h2>
		<p style="color: var(--waku-fg-muted);">
			A system for creating a clear visual hierarchy in your page layout.
		</p>
	</section>

	<section class="demo-section">
		<h3 class="demo-title">Nested Stacks</h3>
		<p class="mb-4" style="color: var(--waku-fg-muted);">
			Use the <code>elevation</code> prop on <code>VStack</code> or <code>HStack</code> to create distinct
			layout regions.
		</p>
		<HStack
			elevation={0}
			class="h-96 w-full items-stretch rounded-lg p-4"
			style="background: var(--waku-surface-0)"
		>
			<VStack elevation={1} class="w-1/3 rounded p-4">
				<p class="font-bold">Sidebar (elevation=1)</p>
			</VStack>
			<VStack elevation={0} class="w-2/3 p-4">
				<p class="font-bold">Main Content (elevation=0)</p>
				<Card elevation={2} class="mt-4">
					<p>
						This is a Card component with <code>elevation={2}</code>, sitting on top of the main
						content area.
					</p>
				</Card>
			</VStack>
		</HStack>
	</section>
</div>
