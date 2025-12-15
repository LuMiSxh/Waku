<script lang="ts">
	import { Button, Card, VStack, HStack, Separator } from '$lib/index.js';
	import { BentoGrid, BentoItem } from '$lib/layout/index.js';
	import { Label } from '$lib/components/index.js';
	import { IconTrash, IconSend, IconPlus } from '@tabler/icons-svelte';

	const variants = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
	const styles = ['solid', 'subtle', 'outline', 'ghost'] as const;
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Button</h2>
		<p class="text-muted">
			Interactive trigger components with a consistent variant/style architecture.
		</p>
	</section>

	<!-- STYLE MATRIX -->
	<section class="demo-section glass">
		<h3 class="demo-title">Style Matrix</h3>
		<div class="overflow-x-auto">
			<table class="w-full min-w-[600px] border-collapse text-left">
				<thead>
					<tr>
						<th class="text-muted p-4 text-xs font-bold tracking-wider uppercase">Variant</th>
						<th class="text-muted p-4 text-xs font-bold tracking-wider uppercase">Solid</th>
						<th class="text-muted p-4 text-xs font-bold tracking-wider uppercase">Subtle</th>
						<th class="text-muted p-4 text-xs font-bold tracking-wider uppercase">Outline</th>
						<th class="text-muted p-4 text-xs font-bold tracking-wider uppercase">Ghost</th>
					</tr>
				</thead>
				<tbody>
					{#each variants as variant (variant)}
						<tr class="border-waku-border/50 hover:bg-surface-2 border-t transition-colors">
							<td class="p-4 text-sm font-medium capitalize">{variant}</td>
							{#each styles as style (style)}
								<td class="p-4">
									<Button {variant} {style} size="sm">
										{variant}
									</Button>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- GLASS BUTTONS -->
	<section class="demo-section bg-noise border-waku-border border">
		<h3 class="demo-title">Glass Buttons</h3>
		<p class="text-muted mb-6">
			Use the <code>glass</code> prop for high-fidelity UI elements that sit on top of complex backgrounds.
		</p>

		<div class="relative flex justify-center gap-4 overflow-hidden rounded-xl p-12">
			<!-- Abstract Background -->
			<div
				class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-orange-500/20"
			></div>
			<div
				class="absolute inset-0"
				style="background-image: radial-gradient(circle at 30% 30%, var(--waku-surface-1) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1;"
			></div>

			<!-- Buttons -->
			<Button variant="neutral" glass style="solid">Glass Solid</Button>
			<Button variant="primary" glass style="subtle">Glass Subtle</Button>
			<Button variant="danger" glass style="outline">Glass Outline</Button>
		</div>
	</section>

	<!-- LOADING & POLYMORPHISM -->
	<section class="demo-section glass">
		<h3 class="demo-title">States & Functionality</h3>
		<HStack gap="xl" align="start">
			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">Loading State</h4>
				<div class="flex gap-2">
					<Button loading>Saving...</Button>
					<Button variant="neutral" style="outline" loading>Loading</Button>
				</div>
			</VStack>

			<Separator orientation="vertical" class="h-24" />

			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">As Links (href)</h4>
				<div class="flex gap-2">
					<Button href="#" variant="primary" style="solid">I'm an &lt;a&gt; tag</Button>
				</div>
			</VStack>

			<Separator orientation="vertical" class="h-24" />

			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">Icon Buttons</h4>
				<div class="flex gap-2">
					<Button size="icon" variant="neutral" style="ghost">
						<IconTrash size={20} />
					</Button>
					<Button size="icon" variant="primary" style="solid" class="rounded-full!">
						<IconPlus size={20} />
					</Button>
				</div>
			</VStack>
		</HStack>
	</section>

	<Separator />

	<!-- SEAMLESS VARIANT -->
	<section>
		<h3 class="mb-4 text-xl font-semibold">Seamless Variant</h3>
		<p class="text-muted mb-6">
			Use the <code>style="seamless"</code> variant for buttons inside BentoItems. Seamless buttons blend
			into the layout, adapt to density, and highlight their parent when focused.
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
						>Enter</kbd
					>
					or
					<kbd class="rounded bg-neutral-200 px-2 py-1 font-mono text-xs dark:bg-neutral-800"
						>Space</kbd
					> to activate.
				</p>
				<BentoGrid cols={3} density="normal">
					<BentoItem glass>
						<Label text="Quick Action" />
						<Button style="seamless" onclick={() => alert('Export clicked!')}>Export Project</Button
						>
					</BentoItem>
					<BentoItem glass>
						<Label text="Settings" />
						<Button style="seamless" onclick={() => alert('Settings clicked!')}
							>Open Settings</Button
						>
					</BentoItem>
					<BentoItem glass>
						<Label text="Publish" />
						<Button style="seamless" onclick={() => alert('Publish clicked!')}>Publish Now</Button>
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
								<Label text="Action" />
								<Button style="seamless">Compact Button</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Another Action</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Third Action</Button>
							</BentoItem>
						</BentoGrid>
					</div>

					<div>
						<h5 class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">Normal</h5>
						<BentoGrid cols={3} density="normal">
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Normal Button</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Another Action</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Third Action</Button>
							</BentoItem>
						</BentoGrid>
					</div>

					<div>
						<h5 class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">
							Comfortable
						</h5>
						<BentoGrid cols={3} density="comfortable">
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Comfortable Button</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Another Action</Button>
							</BentoItem>
							<BentoItem glass>
								<Label text="Action" />
								<Button style="seamless">Third Action</Button>
							</BentoItem>
						</BentoGrid>
					</div>
				</div>
			</div>

			<!-- Multiple Actions Example -->
			<div>
				<h4 class="text-muted mb-3 text-sm font-semibold">Multiple Actions</h4>
				<BentoGrid cols={2} density="normal">
					<BentoItem glass>
						<Label text="Quick Actions" />
						<div class="flex gap-4">
							<Button style="seamless" onclick={() => alert('Export')}>Export</Button>
							<Button style="seamless" onclick={() => alert('Import')}>Import</Button>
							<Button style="seamless" onclick={() => alert('Share')}>Share</Button>
						</div>
					</BentoItem>

					<BentoItem glass class="justify-between">
						<div>
							<Label text="Project Actions" />
							<div class="mt-2 flex gap-4">
								<Button style="seamless" onclick={() => alert('Settings')}>Settings</Button>
								<Button style="seamless" onclick={() => alert('Publish')}>Publish</Button>
							</div>
						</div>
						<Button variant="primary" size="md">Save Changes</Button>
					</BentoItem>
				</BentoGrid>
			</div>
		</div>
	</section>
</div>
