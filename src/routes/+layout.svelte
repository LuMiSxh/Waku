<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { resolve } from '$app/paths';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let darkMode = $state(false);

	function toggleDarkMode() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<svelte:head>
	<title>Waku Component Showcase</title>
</svelte:head>

<div class="min-h-screen">
	<header class="border-border glass sticky top-0 z-50 border-b">
		<div class="container mx-auto flex items-center justify-between px-4 py-4">
			<h1 class="text-2xl font-bold"><a href={resolve('/')}>Waku Component Showcase</a></h1>
			<button onclick={toggleDarkMode} class="btn btn-ghost rounded-md px-4 py-2 transition-colors">
				{darkMode ? 'Light Mode' : 'Dark Mode'}
			</button>
		</div>
	</header>

	<main class="container mx-auto px-4 py-8">
		{@render children()}
	</main>
</div>

<style global>
	:global(.demo-section) {
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		border: 1px solid var(--waku-border);
		background: var(--waku-bg-layer-1);
	}
	:global(.demo-title) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	:global(.demo-container) {
		border-radius: var(--radius-md);
		border: 1px dashed var(--waku-border);
		background: oklch(from var(--waku-bg-base) l c h / 0.3);
	}
	:global(.demo-item) {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-sm);
		background-color: var(--accent-200);
		color: var(--accent-800);
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}
	:global(.space-y-12 > * + *) {
		margin-top: 3rem;
	}
</style>
