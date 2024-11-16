<script lang="ts">
	import { initializeLayoutState, setupNavigationEffect, isClient } from './layout.svelte';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$shadcn/sonner';
	import '../app.css';
	import SmoothScrollBar from '$lib/components/smoothScrollBar/SmoothScrollBar.svelte';
	import {
		firstLoadComplete,
		setFirstOpen,
		setRessourceToValide
	} from '$lib/store/initialLoaderStore';
	import Loader from '$lib/components/loader/Loader.svelte';
	import { page } from '$app/stores';
	import Scene from '$lib/components/threlte/Scene.svelte';

	let { children } = $props();

	$effect(() => {
		const unsubscribe = page.subscribe((currentPage) => {
			initializeLayoutState(currentPage);
		});
		setupNavigationEffect();
		setFirstOpen(true);
		setRessourceToValide(true);

		return unsubscribe;
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<meta name="viewport" content="width=device-width" />
	<link rel="manifest" href="/pwa/manifest.webmanifest" />
	<meta name="theme-color" content="#4285f4" />
</svelte:head>

{#if !$firstLoadComplete}
	<Loader />
{/if}
{#if $isClient}
	<div class="threlte">
		<Scene />
	</div>
	<ModeWatcher />
	<div class="container">
		<SmoothScrollBar>
			<main>
				{@render children()}
			</main>
		</SmoothScrollBar>
	</div>
	<Toaster />
{/if}

<style>
	main {
		overflow-x: hidden;
	}
	.container {
		width: 100%;
		padding: 0;
		margin: 0;
		max-width: none;
	}

	.threlte {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		z-index: -1;
	}
</style>
