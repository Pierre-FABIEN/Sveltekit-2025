<script lang="ts">
	import { page, navigating } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$shadcn/sonner';
	import { Progress } from '$shadcn/progress/index.js';
	import '../app.css';
	import { navigationStore } from '$store/navigationStore';
	import { onNavigate } from '$app/navigation';
	import SmoothScrollBar from '$lib/components/smoothScrollBar/SmoothScrollBar.svelte';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar';
	import SidebarMenu from '$lib/components/SidebarMenu.svelte';

	import AlignJustify from 'lucide-svelte/icons/align-justify';
	import { useSidebar } from '$lib/components/shadcn/ui/sidebar/index.js';
	import {
		firstLoadComplete,
		setFirstOpen,
		setRessourceToValide
	} from '$lib/store/initialLoaderStore';
	import Loader from '$lib/components/loader/Loader.svelte';

	const sidebar = useSidebar();

	let { children } = $props();
	let isClient = $state(false);
	let loading = $state(true);
	let progressValue = $state(0);
	let previousRouteId = $state($page.route.id);

	$effect(() => {
		setFirstOpen(true);
		setRessourceToValide(true);

		const currentData = {
			routeId: $page.route.id
		};

		navigationStore.set({
			from: null,
			to: currentData
		});

		isClient = true;
		const timer = setInterval(() => {
			if (progressValue < 100) {
				progressValue += 10;
			} else {
				clearInterval(timer);
				loading = false;
			}
		}, 10);
	});

	onNavigate((navigation) => {
		const fromData = navigation.from
			? {
					routeId: navigation.from.route.id
				}
			: null;

		const toData = navigation.to
			? {
					routeId: navigation.to.route.id
				}
			: null;

		// Vérifier les conditions avant de mettre à jour le store
		if (fromData && toData && fromData.routeId !== toData.routeId) {
			navigationStore.set({
				from: fromData,
				to: toData
			});
			previousRouteId = toData.routeId;
		} else {
		}
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

<Sidebar.Provider>
	<ModeWatcher />

	<SidebarMenu />

	<div class="container">
		<div class="iconeNav">
			<Sidebar.Trigger>
				{#if !sidebar.open}
					<button
						class="fixed z-50 p-2 rounded-md bg-sidebar-background text-sidebar-foreground hover:bg-sidebar-accent"
						onclick={() => sidebar.toggle()}
					>
						<AlignJustify class="h-6 w-6" />
						<span class="sr-only">Ouvrir la sidebar</span>
					</button>
				{/if}
			</Sidebar.Trigger>
		</div>
		<SmoothScrollBar>
			<main>
				{@render children()}
			</main>
		</SmoothScrollBar>
	</div>
	<Toaster />
</Sidebar.Provider>

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
	.iconeNav {
		position: absolute;
		z-index: 100;
	}
</style>
