<script lang="ts">
	import { Select, VStack } from '$lib/index.js';
	import type { SelectOption } from '$lib/components/Select.svelte';

	let frameworks: SelectOption[] = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'solid', label: 'Solid' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'react', label: 'React' },
		{ value: 'qwik', label: 'Qwik' }
	];

	let selectedFramework = $state('svelte');
	let selectedPlanet = $state(undefined);
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Select</h2>
		<p style="color: var(--waku-fg-muted);">A fully custom and accessible dropdown component.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Interactive Example</h3>
		<VStack gap="md" class="max-w-sm">
			<div>
				<label for="s1" class="mb-1 block text-sm font-medium">Choose a framework:</label>
				<Select id="s1" options={frameworks} bind:value={selectedFramework} />
				<p class="mt-2 text-sm" style="color: var(--waku-fg-muted);">
					Selected: <span class="font-mono">{selectedFramework}</span>
				</p>
			</div>
		</VStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">States</h3>
		<VStack gap="md" class="max-w-sm">
			<div>
				<label for="s2" class="mb-1 block text-sm font-medium">With Placeholder</label>
				<Select
					id="s2"
					placeholder="Select a planet..."
					options={[
						{ value: 'earth', label: 'Earth' },
						{ value: 'mars', label: 'Mars' }
					]}
					bind:value={selectedPlanet}
				/>
			</div>

			<div>
				<label for="s3" class="mb-1 block text-sm font-medium">Disabled</label>
				<Select id="s3" options={frameworks} value="svelte" disabled />
			</div>
		</VStack>
	</section>
</div>
