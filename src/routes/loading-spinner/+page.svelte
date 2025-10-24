<script lang="ts">
	import { LoadingSpinner } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Loading Spinner</h2>
		<p style="color: var(--waku-fg-muted);">A visual indicator that content is loading.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Sizes</h3>
		<div class="flex flex-wrap items-center gap-6">
			<LoadingSpinner size="sm" />
			<LoadingSpinner size="md" />
			<LoadingSpinner size="lg" />
		</div>
	</section>
</div>
