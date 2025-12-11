<script lang="ts">
	import { Button, Card, VStack, HStack, Separator } from '$lib/index.js';
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
</div>
