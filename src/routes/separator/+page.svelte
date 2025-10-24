<script lang="ts">
	import { Separator, VStack, HStack } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Separator</h2>
		<p style="color: var(--waku-fg-muted);">A line to visually divide content.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Horizontal</h3>
		<VStack class="w-full max-w-md">
			<p>Content above</p>
			<Separator />
			<p>Content below</p>
		</VStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Vertical</h3>
		<HStack class="h-24">
			<p>Left side</p>
			<Separator orientation="vertical" />
			<p>Right side</p>
		</HStack>
	</section>
</div>
