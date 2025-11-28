<script lang="ts">
	import { Label, VStack, Card } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Label</h2>
		<p class="text-muted">Consistent typography for Bento headers and form labels.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Example</h3>
		<Card>
			<VStack gap="lg">
				<div>
					<Label text="Default Label" />
					<p>Content below label</p>
				</div>
				<div>
					<Label text="Input Label" for="demo-input" />
					<input id="demo-input" class="input" placeholder="Native input..." />
				</div>
			</VStack>
		</Card>
	</section>
</div>
