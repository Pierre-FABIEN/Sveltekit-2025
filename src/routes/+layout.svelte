<script lang="ts">
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$shadcn/sonner';
	import { Progress } from '$shadcn/progress/index.js';
	import '../app.css';
	import { navigationStore } from '$store/navigationStore';
	import { onNavigate } from '$app/navigation';
	import SmoothScrollBar from '$lib/components/smoothScrollBar/SmoothScrollBar.svelte';

	let { children } = $props();
	let isClient = $state(false);
	let loading = $state(true);
	let value = $state(0);
	let previousRouteId: string | null = $state(null);

	$effect(() => {
		const currentData = {
			routeId: $page.route.id
		};

		navigationStore.set({
			from: null,
			to: currentData
		});

		isClient = true;
		const timer = setInterval(() => {
			if (value < 100) {
				value += 10;
			} else {
				clearInterval(timer);
				loading = false;
			}
		}, 100);
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

{#if loading}
	<div class="flex h-[100vh] w-[100vw] items-center justify-center">
		<Progress {value} max={100} class="w-[50vw]" />
	</div>
{:else if isClient}
	<ModeWatcher />

	<div class="navigation mt-5 flex justify-center">
		<nav
			class="rcb flex w-[80vw] items-center justify-center space-x-4 rounded border p-3 lg:space-x-6"
		>
			<a
				href="/"
				class={`text-sm font-medium ${$page.url.pathname === '/' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Accueil
			</a>
			<a
				href="/transitionDemo"
				class={`text-sm font-medium ${$page.url.pathname === '/transitionDemo' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				transitionDemo
			</a>
			<a
				href="/directors"
				class={`text-sm font-medium ${$page.url.pathname === '/directors' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Directors
			</a>
			<a
				href="/agencies"
				class={`text-sm font-medium ${$page.url.pathname === '/agencies' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Agencies
			</a>
			<a
				href="/products"
				class={`text-sm font-medium ${$page.url.pathname === '/products' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Products
			</a>
			<a
				href="/stats"
				class={`text-sm font-medium ${$page.url.pathname === '/stats' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				statistical
			</a>
			<a
				href="/snippet"
				class={`text-sm font-medium ${$page.url.pathname === '/snippet' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Snippet
			</a>
			<a
				href="/state"
				class={`text-sm font-medium ${$page.url.pathname === '/state' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				State
			</a>
			<a
				href="/auth"
				class={`text-sm font-medium ${$page.url.pathname === '/auth' ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
			>
				Auth
			</a>
		</nav>
	</div>

	<SmoothScrollBar>
		<main>
			{@render children()}
		</main>
	</SmoothScrollBar>

	<Toaster />
{/if}

<style>
	.navigation {
		position: absolute;
		width: 100vw;
		top: 0;
		left: 0;
		z-index: 100;
	}

	main {
		overflow-x: hidden;
		padding-top: 20vh;
	}
</style>
