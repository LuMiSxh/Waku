<script lang="ts">
	import { Tooltip, Button, Card } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Tooltip</h2>
		<p style="color: var(--waku-fg-muted);">A small pop-up label for providing extra info.</p>
	</section>

	<section class="demo-section">
		<h3 class="demo-title">Glass Effect</h3>
		<p class="mb-4" style="color: var(--waku-fg-muted);">
			The tooltip uses the "Material Glass" effect, appearing as a floating layer.
		</p>
		<Card padding="lg" class="flex items-center justify-center">
			<Tooltip text="This button saves your progress.">
				<Button>Hover or Focus Me</Button>
			</Tooltip>
		</Card>
	</section>
</div>
