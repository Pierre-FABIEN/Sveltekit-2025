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
	import NavigationMenu from '$lib/components/navigation/NavigationMenu.svelte';
	import Breadcrumb from '$lib/components/navigation/Breadcrumb.svelte';

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
	<div class="wappper">
		<ModeWatcher />

		<div class="container">
			<div class="iconeNav flex justify-end place-items-center px-5 py-2">
				<NavigationMenu />
				<Breadcrumb />
			</div>
			<SmoothScrollBar>
				<main class="mainLayout">
					{@render children()}
				</main>
			</SmoothScrollBar>
		</div>
		<Toaster />
	</div>
{/if}

<style>
	.container {
		width: 100%;
		padding: 0;
		margin: 0;
		max-width: none;
	}

	.iconeNav {
		position: absolute;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.75);
		border-top-left-radius: 5px;
		left: 0%;
		bottom: 0px;
	}

	.wappper {
		background: linear-gradient(to bottom, #23064f07, #ff680a05) !important;
	}
</style>
