<script lang="ts">
	import { Input, VStack, Label } from '$lib/index.js';
	import { BentoItem } from '$lib/layout/index.js';
	let textValue = 'Bleach Vol. 1-74';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Input</h2>
		<p class="text-muted">A standard form input field with multiple styles.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Default Variant</h3>
		<p class="text-muted mb-4 text-sm">Standard bordered input for traditional forms.</p>
		<VStack gap="md" class="max-w-sm">
			<Input placeholder="Default size (md)" />
			<Input size="sm" placeholder="Small size (sm)" />
			<Input disabled placeholder="Disabled input" />
		</VStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Seamless Variant (Bento)</h3>
		<p class="text-muted mb-4 text-sm">
			Designed to sit inside a Bento Item. Removes borders and padding to blend with the container.
		</p>

		<div class="grid max-w-md gap-4">
			<!-- Simulating a Bento Box -->
			<BentoItem>
				<Label text="Project Name" for="pname" />
				<Input id="pname" variant="seamless" bind:value={textValue} />
			</BentoItem>

			<BentoItem>
				<Label text="Comment" />
				<Input variant="seamless" placeholder="Enter a description..." />
			</BentoItem>
		</div>
	</section>
</div>
