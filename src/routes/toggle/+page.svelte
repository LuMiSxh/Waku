<script lang="ts">
	import { Toggle, HStack, VStack } from '$lib/index.js';
	let isToggled = $state(true);
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Toggle</h2>
		<p style="color: var(--waku-fg-muted);">A switch for turning boolean states on or off.</p>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Interactive</h3>
		<HStack gap="lg" align="center">
			<Toggle bind:checked={isToggled} />
			<span>The toggle is {isToggled ? 'ON' : 'OFF'}</span>
		</HStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Variants</h3>
		<HStack gap="xl" align="center">
			<VStack align="center">
				<Toggle variant="primary" checked />
				<span>Primary</span>
			</VStack>
			<VStack align="center">
				<Toggle variant="success" checked />
				<span>Success</span>
			</VStack>
			<VStack align="center">
				<Toggle variant="danger" checked />
				<span>Danger</span>
			</VStack>
		</HStack>
	</section>

	<section class="demo-section glass">
		<h3 class="demo-title">Disabled States</h3>
		<HStack gap="lg" align="center">
			<Toggle checked disabled />
			<Toggle disabled />
		</HStack>
	</section>
</div>
