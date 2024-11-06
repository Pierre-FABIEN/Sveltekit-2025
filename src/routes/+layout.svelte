<script lang="ts">
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import '../app.css';
	import { navigationStore } from '$lib/Store/navigationStore';
	import { onNavigate } from '$app/navigation';

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
	});

	$effect(() => {
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

		console.log('Navigation event:', { fromData, toData });

		// Vérifier les conditions avant de mettre à jour le store
		if (fromData && toData && fromData.routeId !== toData.routeId) {
			console.log('Updating navigationStore:', { from: fromData, to: toData });
			navigationStore.set({
				from: fromData,
				to: toData
			});
			previousRouteId = toData.routeId;
		} else {
			console.log('Navigation ignored due to conditions.');
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
		</nav>
	</div>

	<main>
		{@render children()}
	</main>

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
		position: absolute;
		padding-top: 20vh;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x: hidden;
	}
</style>
