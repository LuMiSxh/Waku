<script lang="ts">
	import { Input, VStack } from '$lib/index.js';
	let textValue = 'Bound value';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Input</h2>
		<p style="color: var(--waku-fg-muted);">A standard form input field.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Variants</h3>
		<VStack gap="md" class="max-w-sm">
			<Input placeholder="Default size (md)" />
			<Input size="sm" placeholder="Small size (sm)" />
			<Input size="lg" placeholder="Large size (lg)" />
			<Input placeholder="Disabled" disabled />
			<div>
				<Input bind:value={textValue} />
				<p class="mt-2 text-sm" style="color: var(--waku-fg-muted);">
					Value: <span class="font-mono">{textValue}</span>
				</p>
			</div>
		</VStack>
	</section>
</div>
