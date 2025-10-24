<script lang="ts">
	import { Alert, VStack } from '$lib/index.js';
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Alert</h2>
		<p style="color: var(--waku-fg-muted);">A component for displaying important messages.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Variants</h3>
		<VStack gap="md" align="stretch">
			<Alert variant="info">This is for your information.</Alert>
			<Alert variant="success">The operation was successful!</Alert>
			<Alert variant="warning">Something might be wrong. Please double-check.</Alert>
			<Alert variant="danger">An error occurred while processing your request.</Alert>
		</VStack>
	</section>
</div>
