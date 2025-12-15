<script lang="ts">
	import { Toggle, HStack, VStack, Separator } from '$lib/index.js';
	import { BentoGrid, BentoItem } from '$lib/layout/index.js';
	import { Label } from '$lib/components/index.js';

	let isToggled = $state(true);
	let notifications = $state(true);
	let autoSave = $state(false);
	let darkMode = $state(true);
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Toggle</h2>
		<p class="text-muted">
			A switch component for boolean states with default and seamless styles.
		</p>
	</section>

	<!-- INTERACTIVE DEMO -->
	<section class="demo-section glass">
		<h3 class="demo-title">Interactive</h3>
		<HStack gap="lg" align="center">
			<Toggle bind:checked={isToggled} />
			<span>The toggle is {isToggled ? 'ON' : 'OFF'}</span>
		</HStack>
	</section>

	<!-- VARIANTS -->
	<section class="demo-section glass">
		<h3 class="demo-title">Color Variants</h3>
		<p class="text-muted mb-6">
			Toggle supports three color variants for different semantic meanings.
		</p>
		<HStack gap="xl" align="center">
			<VStack align="center">
				<Toggle variant="primary" checked />
				<span class="text-sm">Primary</span>
			</VStack>
			<VStack align="center">
				<Toggle variant="success" checked />
				<span class="text-sm">Success</span>
			</VStack>
			<VStack align="center">
				<Toggle variant="danger" checked />
				<span class="text-sm">Danger</span>
			</VStack>
		</HStack>
	</section>

	<!-- STATES -->
	<section class="demo-section glass">
		<h3 class="demo-title">States</h3>
		<div class="grid grid-cols-2 gap-8">
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Enabled</h4>
				<HStack gap="lg">
					<Toggle checked />
					<Toggle />
				</HStack>
			</div>
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Disabled</h4>
				<HStack gap="lg">
					<Toggle checked disabled />
					<Toggle disabled />
				</HStack>
			</div>
		</div>
	</section>

	<Separator />

	<!-- SEAMLESS VARIANT -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Seamless Variant</h3>
		<p class="text-muted mb-6">
			Use the <code>style="seamless"</code> variant for toggles inside BentoItems. Seamless toggles adapt
			to the grid's density and highlight their parent when focused.
		</p>

		<div class="space-y-8">
			<!-- Keyboard Navigation Test -->
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Keyboard Navigation</h4>
				<p class="text-muted mb-4 text-sm">
					Press <kbd class="rounded bg-neutral-200 px-2 py-1 font-mono text-xs dark:bg-neutral-800"
						>Tab</kbd
					>
					to navigate and
					<kbd class="rounded bg-neutral-200 px-2 py-1 font-mono text-xs dark:bg-neutral-800"
						>Space</kbd
					> to toggle.
				</p>
				<BentoGrid cols={3} density="normal">
					<BentoItem glass>
						<Label text="Notifications" />
						<div class="flex items-center gap-3">
							<Toggle style="seamless" bind:checked={notifications} variant="primary" />
							<span class="text-lg font-bold">{notifications ? 'Enabled' : 'Disabled'}</span>
						</div>
					</BentoItem>
					<BentoItem glass>
						<Label text="Auto-save" />
						<div class="flex items-center gap-3">
							<Toggle style="seamless" bind:checked={autoSave} variant="success" />
							<span class="text-lg font-bold">{autoSave ? 'On' : 'Off'}</span>
						</div>
					</BentoItem>
					<BentoItem glass>
						<Label text="Dark Mode" />
						<div class="flex items-center gap-3">
							<Toggle style="seamless" bind:checked={darkMode} variant="primary" />
							<span class="text-lg font-bold">{darkMode ? 'Dark' : 'Light'}</span>
						</div>
					</BentoItem>
				</BentoGrid>
			</div>

			<!-- Density Levels -->
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Density Levels</h4>
				<div class="space-y-6">
					<div>
						<h5 class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">Compact</h5>
						<BentoGrid cols={3} density="compact">
							<BentoItem glass>
								<Label text="Primary" />
								<Toggle style="seamless" checked variant="primary" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Success" />
								<Toggle style="seamless" checked variant="success" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Danger" />
								<Toggle style="seamless" checked variant="danger" />
							</BentoItem>
						</BentoGrid>
					</div>

					<div>
						<h5 class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">Normal</h5>
						<BentoGrid cols={3} density="normal">
							<BentoItem glass>
								<Label text="Primary" />
								<Toggle style="seamless" checked variant="primary" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Success" />
								<Toggle style="seamless" checked variant="success" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Danger" />
								<Toggle style="seamless" checked variant="danger" />
							</BentoItem>
						</BentoGrid>
					</div>

					<div>
						<h5 class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">
							Comfortable
						</h5>
						<BentoGrid cols={3} density="comfortable">
							<BentoItem glass>
								<Label text="Primary" />
								<Toggle style="seamless" checked variant="primary" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Success" />
								<Toggle style="seamless" checked variant="success" />
							</BentoItem>
							<BentoItem glass>
								<Label text="Danger" />
								<Toggle style="seamless" checked variant="danger" />
							</BentoItem>
						</BentoGrid>
					</div>
				</div>
			</div>

			<!-- Settings Panel Example -->
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Settings Panel Example</h4>
				<BentoGrid cols={2} density="normal">
					<BentoItem glass>
						<Label text="Application Settings" class="mb-4!" />
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Enable notifications</span>
								<Toggle style="seamless" checked variant="primary" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Auto-save changes</span>
								<Toggle style="seamless" checked={false} variant="success" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Debug mode</span>
								<Toggle style="seamless" checked={false} variant="danger" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Compact view</span>
								<Toggle style="seamless" checked variant="primary" />
							</div>
						</div>
					</BentoItem>

					<BentoItem glass>
						<Label text="Privacy Settings" class="mb-4!" />
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Share analytics</span>
								<Toggle style="seamless" checked={false} variant="primary" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Allow cookies</span>
								<Toggle style="seamless" checked variant="success" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">Track location</span>
								<Toggle style="seamless" checked={false} variant="danger" />
							</div>
						</div>
					</BentoItem>
				</BentoGrid>
			</div>
		</div>
	</section>
</div>
