<script lang="ts">
	import { Badge, Card, VStack, HStack, Separator } from '$lib/index.js';
	import { IconCheck, IconShield, IconCpu } from '@tabler/icons-svelte';

	const variants = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;
	const styles = ['solid', 'subtle', 'outline', 'ghost'] as const;
</script>

<div class="space-y-12">
	<section>
		<h2 class="mb-2 text-3xl font-bold">Badge</h2>
		<p class="text-muted">
			Interactive status indicators with support for visual styles and glassmorphism.
		</p>
	</section>

	<!-- MATRIX: Variants vs Styles -->
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
					{#each variants as variant}
						<tr class="border-waku-border/50 hover:bg-surface-2 border-t transition-colors">
							<td class="p-4 text-sm font-medium capitalize">{variant}</td>
							{#each styles as style}
								<td class="p-4">
									<Badge {variant} {style}>
										{variant}
									</Badge>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- GLASS EFFECT -->
	<section class="demo-section bg-noise border-waku-border border">
		<h3 class="demo-title">Glass Effect</h3>
		<p class="text-muted mb-6">
			Add the <code>glass</code> prop to any variant to give it depth, a subtle border, and a backdrop
			blur. Works best on colored backgrounds.
		</p>

		<div class="relative overflow-hidden rounded-xl p-8">
			<!-- Abstract Background to show off the blur -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20"
			></div>
			<div
				class="absolute inset-0"
				style="background-image: radial-gradient(circle at 50% 50%, var(--waku-surface-1) 2px, transparent 2px); background-size: 24px 24px; opacity: 0.1;"
			></div>

			<div class="relative z-10 flex flex-wrap items-center justify-center gap-4">
				<Badge variant="neutral" glass style="solid">Glass Solid</Badge>
				<Badge variant="primary" glass style="solid">Primary Glass</Badge>
				<Badge variant="success" glass style="subtle">Success Subtle</Badge>
				<Badge variant="warning" glass style="outline">Warning Outline</Badge>
				<Badge variant="danger" glass style="subtle">
					<span class="flex items-center gap-1">
						<IconShield size={12} stroke={2.5} />
						Security
					</span>
				</Badge>
			</div>
		</div>
	</section>

	<!-- SIZES & ICONS -->
	<section class="demo-section glass">
		<h3 class="demo-title">Sizes & Icons</h3>
		<HStack gap="xl" align="center">
			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">Small (sm)</h4>
				<div class="flex gap-2">
					<Badge size="sm" variant="neutral">Neutral</Badge>
					<Badge size="sm" variant="primary" style="outline">Outline</Badge>
				</div>
			</VStack>

			<Separator orientation="vertical" class="h-16" />

			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">Medium (md)</h4>
				<div class="flex gap-2">
					<Badge size="md" variant="neutral">Neutral</Badge>
					<Badge size="md" variant="primary" style="outline">Outline</Badge>
				</div>
			</VStack>

			<Separator orientation="vertical" class="h-16" />

			<VStack gap="sm">
				<h4 class="text-muted text-sm font-semibold">With Icons</h4>
				<div class="flex gap-2">
					<Badge variant="success" style="subtle" class="gap-1 pl-1">
						<IconCheck size={14} stroke={3} />
						Completed
					</Badge>
					<Badge variant="info" style="solid" class="gap-1.5 pl-1.5">
						<IconCpu size={14} stroke={2.5} />
						System
					</Badge>
				</div>
			</VStack>
		</HStack>
	</section>
</div>
