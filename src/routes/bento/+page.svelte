<script lang="ts">
	import { BentoGrid, BentoItem, Separator } from '$lib/layout/index.js';
	import { Label, Input, Button, Select, Toggle } from '$lib/components/index.js';

	let projectName = $state('My Project');
	let projectType = $state<string>();
	let format = $state<string>();
	let notifications = $state(true);
	let autoSave = $state(false);
	let darkMode = $state(true);
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Bento Layout</h2>
		<p class="text-muted">
			A modular grid system for building dashboard-like interfaces with glass effects and seamless
			interactive components.
		</p>
	</section>

	<!-- TAB ACCESSIBILITY TEST -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Keyboard Navigation Test</h3>
		<p class="text-muted mb-6">
			Press <kbd class="rounded bg-neutral-200 px-2 py-1 font-mono text-xs dark:bg-neutral-800"
				>Tab</kbd
			> to navigate through all interactive elements. Each should be focusable:
		</p>

		<BentoGrid cols={4} density="normal">
			<BentoItem glass>
				<Label text="1. Input" />
				<Input style="seamless" value="Tab me" />
			</BentoItem>

			<BentoItem glass>
				<Label text="2. Select" />
				<Select
					style="seamless"
					options={[
						{ value: 'a', label: 'Option A' },
						{ value: 'b', label: 'Option B' },
					]}
					placeholder="Tab me"
				/>
			</BentoItem>

			<BentoItem glass>
				<Label text="3. Button" />
				<Button
					style="seamless"
					onclick={() => alert('Clicked!')}
					onkeydown={(evt) => {
						if (evt.key === 'Enter') alert('Enter pressed!');
					}}>Tab me</Button
				>
			</BentoItem>

			<BentoItem glass>
				<Label text="4. Toggle" />
				<Toggle style="seamless" checked />
			</BentoItem>
		</BentoGrid>
	</section>

	<Separator />

	<!-- FOCUS BEHAVIOR -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Focus Behavior</h3>
		<p class="text-muted mb-6">
			All seamless elements (Input, Select, Button, Toggle) highlight their parent glass BentoItem
			when focused, creating a cohesive visual feedback system across the entire interface.
		</p>

		<BentoGrid cols={4} density="normal">
			<BentoItem glass>
				<Label text="Input Field" />
				<Input style="seamless" value="Focus me" />
			</BentoItem>
			<BentoItem glass>
				<Label text="Select Field" />
				<Select style="seamless" options={[{ value: '1', label: 'Focus me' }]} />
			</BentoItem>
			<BentoItem glass>
				<Label text="Button" />
				<Button style="seamless">Focus me</Button>
			</BentoItem>
			<BentoItem glass>
				<Label text="Toggle" />
				<Toggle style="seamless" checked />
			</BentoItem>
		</BentoGrid>
	</section>

	<Separator />

	<!-- DENSITY LEVELS -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Density Levels</h3>
		<p class="text-muted mb-6">All seamless components adapt to the grid's density setting.</p>

		<div class="space-y-8">
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold tracking-wide uppercase">Compact</h4>
				<BentoGrid cols={4} density="compact">
					<BentoItem glass>
						<Label text="Input" />
						<Input style="seamless" value="Compact" />
					</BentoItem>
					<BentoItem glass>
						<Label text="Select" />
						<Select style="seamless" options={[{ value: '1', label: 'Compact' }]} />
					</BentoItem>
					<BentoItem glass>
						<Label text="Button" />
						<Button style="seamless">Compact</Button>
					</BentoItem>
					<BentoItem glass>
						<Label text="Toggle" />
						<Toggle style="seamless" checked />
					</BentoItem>
				</BentoGrid>
			</div>

			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold tracking-wide uppercase">Normal</h4>
				<BentoGrid cols={4} density="normal">
					<BentoItem glass>
						<Label text="Input" />
						<Input style="seamless" value="Normal" />
					</BentoItem>
					<BentoItem glass>
						<Label text="Select" />
						<Select style="seamless" options={[{ value: '1', label: 'Normal' }]} />
					</BentoItem>
					<BentoItem glass>
						<Label text="Button" />
						<Button style="seamless">Normal</Button>
					</BentoItem>
					<BentoItem glass>
						<Label text="Toggle" />
						<Toggle style="seamless" checked />
					</BentoItem>
				</BentoGrid>
			</div>

			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold tracking-wide uppercase">Comfortable</h4>
				<BentoGrid cols={4} density="comfortable">
					<BentoItem glass>
						<Label text="Input" />
						<Input style="seamless" value="Comfortable" />
					</BentoItem>
					<BentoItem glass>
						<Label text="Select" />
						<Select style="seamless" options={[{ value: '1', label: 'Comfortable' }]} />
					</BentoItem>
					<BentoItem glass>
						<Label text="Button" />
						<Button style="seamless">Comfortable</Button>
					</BentoItem>
					<BentoItem glass>
						<Label text="Toggle" />
						<Toggle style="seamless" checked />
					</BentoItem>
				</BentoGrid>
			</div>
		</div>
	</section>

	<Separator />

	<!-- MULTIPLE INTERACTIVE ELEMENTS -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Multiple Interactive Elements</h3>
		<p class="text-muted mb-6">
			BentoItems can contain multiple seamless elements. Each remains independently focusable.
		</p>

		<BentoGrid cols={3} density="normal">
			<BentoItem glass>
				<Label text="Multiple Buttons" />
				<div class="flex gap-4">
					<Button style="seamless">First</Button>
					<Button style="seamless">Second</Button>
					<Button style="seamless">Third</Button>
				</div>
			</BentoItem>

			<BentoItem glass>
				<Label text="Multiple Toggles" />
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<span class="text-sm">Option 1</span>
						<Toggle style="seamless" checked variant="primary" />
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm">Option 2</span>
						<Toggle style="seamless" variant="success" />
					</div>
				</div>
			</BentoItem>

			<BentoItem glass>
				<Label text="Mixed Elements" />
				<div class="space-y-3">
					<Input style="seamless" value="Input here" />
					<Button style="seamless">Action here</Button>
				</div>
			</BentoItem>
		</BentoGrid>
	</section>

	<Separator />

	<!-- REAL-WORLD EXAMPLE -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Complete Dashboard Example</h3>
		<p class="text-muted mb-6">
			A realistic dashboard combining all seamless components in a cohesive interface.
		</p>

		<BentoGrid cols={3} density="normal">
			<!-- Project Title -->
			<BentoItem colspan={2} glass>
				<Label text="Project Name" />
				<Input style="seamless" bind:value={projectName} placeholder="Enter project name..." />
			</BentoItem>

			<!-- Quick Status -->
			<BentoItem glass class="items-center justify-center">
				<div class="text-3xl font-bold">Ready</div>
				<Label text="Status" class="mt-2 mb-0!" />
			</BentoItem>

			<!-- Type Selection -->
			<BentoItem glass>
				<Label text="Project Type" />
				<Select
					style="seamless"
					bind:value={projectType}
					options={[
						{ value: 'web', label: 'Web App' },
						{ value: 'mobile', label: 'Mobile App' },
						{ value: 'desktop', label: 'Desktop' },
					]}
					placeholder="Select type..."
				/>
			</BentoItem>

			<!-- Format Selection -->
			<BentoItem glass>
				<Label text="Output Format" />
				<Select
					style="seamless"
					bind:value={format}
					options={[
						{ value: 'webp', label: 'WebP' },
						{ value: 'avif', label: 'AVIF' },
						{ value: 'jpeg', label: 'JPEG' },
					]}
					placeholder="Select format..."
				/>
			</BentoItem>

			<!-- Settings -->
			<BentoItem glass>
				<Label text="Settings" />
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Notifications</span>
						<Toggle style="seamless" bind:checked={notifications} variant="primary" />
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Auto-save</span>
						<Toggle style="seamless" bind:checked={autoSave} variant="success" />
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Dark Mode</span>
						<Toggle style="seamless" bind:checked={darkMode} variant="primary" />
					</div>
				</div>
			</BentoItem>

			<!-- Actions -->
			<BentoItem colspan={3} glass class="flex-row items-center justify-between">
				<div class="flex gap-4">
					<Button style="seamless" onclick={() => alert('Exporting...')}>Export</Button>
					<Button style="seamless" onclick={() => alert('Publishing...')}>Publish</Button>
					<Button style="seamless" onclick={() => alert('Settings...')}>Settings</Button>
				</div>
				<Button variant="primary" size="md">Save Project</Button>
			</BentoItem>
		</BentoGrid>
	</section>

	<Separator />

	<!-- VARIANT STYLES -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Seamless Toggle Variants</h3>
		<p class="text-muted mb-6">Seamless toggles support different color variants.</p>

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
	</section>
</div>
