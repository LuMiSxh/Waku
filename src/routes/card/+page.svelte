<script lang="ts">
	import { Card, VStack, HStack, Button, Separator } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Card</h2>
		<p style="color: var(--waku-fg-muted);">An elevated container for grouping content.</p>
	</section>

	<section class="demo-section glass">
		<HStack>
			<div>
				<h3 class="demo-title">Default Card</h3>
				<Card class="max-w-md">
					<VStack gap="sm" align="stretch">
						<h4 class="text-xl font-semibold">Card Title</h4>
						<p style="color: var(--waku-fg-muted);">
							This is a standard card using default props. It a subtle shadow to create a sense of
							elevation.
						</p>
						<Separator />
						<HStack justify="end">
							<Button variant="subtle">Action</Button>
						</HStack>
					</VStack>
				</Card>
			</div>
			<div>
				<h3 class="demo-title">Glass Card</h3>
				<Card class="max-w-md" glass>
					<VStack gap="sm" align="stretch">
						<h4 class="text-xl font-semibold">Card Title</h4>
						<p style="color: var(--waku-fg-muted);">
							This is a glass card using mostly default props. It includes the glass effect and a
							subtle shadow to create a sense of elevation.
						</p>
						<Separator />
						<HStack justify="end">
							<Button variant="subtle">Action</Button>
						</HStack>
					</VStack>
				</Card>
			</div>
		</HStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Padding Variants</h3>
		<VStack gap="md" align="stretch">
			<Card padding="sm"><p>Small padding</p></Card>
			<Card padding="md"><p>Medium padding (default)</p></Card>
			<Card padding="lg"><p>Large padding</p></Card>
			<Card padding="none">
				<img
					src="https://picsum.photos/seed/card/800/200"
					alt="Placeholder"
					class="w-full rounded-lg"
				/>
			</Card>
		</VStack>
	</section>
</div>
