<script lang="ts">
	import { LoadingSpinner, Button, Card, VStack, HStack } from '$lib/index.js';

	// State for the button loading demo
	let isButtonLoading = $state(false);

	function toggleButton() {
		isButtonLoading = true;
		setTimeout(() => {
			isButtonLoading = false;
		}, 2000);
	}

	// State for the fullscreen demo
	let isFullscreenLoading = $state(false);

	function toggleFullscreen() {
		isFullscreenLoading = true;
		// Auto-close after 3 seconds so you don't get stuck!
		setTimeout(() => {
			isFullscreenLoading = false;
		}, 3000);
	}
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Loading Spinner</h2>
		<p class="text-muted">
			A visual indicator for asynchronous operations, powered by Tabler Icons.
		</p>
	</section>

	<!-- Standard Sizes -->
	<section class="demo-section glass">
		<h3 class="demo-title">Sizes</h3>
		<p class="text-muted mb-6">
			Available in four standard sizes matching the design system scale.
		</p>
		<HStack gap="xl" align="center" class="flex-wrap">
			<VStack align="center" gap="sm">
				<LoadingSpinner size="sm" />
				<span class="text-muted font-mono text-xs">sm (16px)</span>
			</VStack>
			<VStack align="center" gap="sm">
				<LoadingSpinner size="md" />
				<span class="text-muted font-mono text-xs">md (24px)</span>
			</VStack>
			<VStack align="center" gap="sm">
				<LoadingSpinner size="lg" />
				<span class="text-muted font-mono text-xs">lg (32px)</span>
			</VStack>
			<VStack align="center" gap="sm">
				<LoadingSpinner size="xl" />
				<span class="text-muted font-mono text-xs">xl (48px)</span>
			</VStack>
		</HStack>
	</section>

	<!-- Context Usage -->
	<section class="demo-section glass">
		<h3 class="demo-title">Contextual Usage</h3>
		<p class="text-muted mb-6">
			Spinners inherit the current text color, making them easy to use inside buttons or colored
			alerts.
		</p>
		<HStack gap="lg" align="center">
			<!-- Button Example -->
			<Button onclick={toggleButton} disabled={isButtonLoading}>
				{#if isButtonLoading}
					<LoadingSpinner size="sm" class="mr-2" />
					Saving...
				{:else}
					Save Changes
				{/if}
			</Button>

			<!-- Text Color Example -->
			<div class="text-accent flex items-center gap-2 font-medium">
				<LoadingSpinner size="sm" />
				<span>Processing...</span>
			</div>
		</HStack>
	</section>

	<!-- Fullscreen Overlay -->
	<section class="demo-section glass">
		<h3 class="demo-title">Fullscreen Overlay</h3>
		<p class="text-muted mb-6">
			Use the <code>fullscreen</code> prop to cover the entire viewport with a glass backdrop. Great
			for initial page loads or blocking actions.
		</p>

		<Card class="bg-surface-2 border-2 border-dashed text-center" padding="lg">
			<VStack align="center" gap="md">
				<p>Click below to test the fullscreen loader.</p>
				<Button style="outline" onclick={toggleFullscreen}>Trigger Fullscreen (3s)</Button>
				<p class="text-muted text-xs">It will automatically close after 3 seconds.</p>
			</VStack>
		</Card>

		{#if isFullscreenLoading}
			<LoadingSpinner fullscreen text="Calibrating Splines..." />
		{/if}
	</section>
</div>
