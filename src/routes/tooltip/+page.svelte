<script lang="ts">
	import { Tooltip, Button } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Tooltip</h2>
		<p style="color: var(--waku-fg-muted);">A small pop-up label for providing extra info.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">On a Button</h3>
		<Tooltip text="This button saves your progress.">
			<Button>Save</Button>
		</Tooltip>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">On an Icon</h3>
		<Tooltip text="View user profile">
			<span class="inline-block rounded-full p-2" style="background: var(--waku-bg-layer-2);">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
						cx="12"
						cy="7"
						r="4"
					/></svg
				>
			</span>
		</Tooltip>
	</section>
</div>
