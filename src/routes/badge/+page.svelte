<script lang="ts">
	import { Badge } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Badge</h2>
		<p style="color: var(--waku-fg-muted);">
			A small component for labeling statuses or properties.
		</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Variants</h3>
		<div class="flex flex-wrap items-center gap-4">
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
			<Badge variant="info">Info</Badge>
		</div>
	</section>
</div>
