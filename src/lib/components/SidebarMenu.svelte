<script lang="ts">
	import LogoSvelte from './LogoSvelte.svelte';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import { page } from '$app/stores';
	import { useSidebar } from '$lib/components/shadcn/ui/sidebar/index.js';
	import {
		MoonIcon,
		SunIcon,
		DatabaseIcon,
		LockIcon,
		SettingsIcon,
		LayoutDashboardIcon,
		ChevronDown,
		Minimize2Icon,
		Maximize2Icon
	} from 'lucide-svelte';

	import { Collapsible } from 'bits-ui';
	import { toggleMode } from 'mode-watcher';
	import { crudItems, stateItems, UIUXItems, AuthItems } from '$lib';

	// Import du composant Tooltip
	import * as Tooltip from '$lib/components/shadcn/ui/tooltip/index.js';
	import { Switch } from '$lib/components/shadcn/ui/switch/index.js';

	const sidebar = useSidebar();

	const DARK_MODE_KEY = 'mode-watcher-mode';
	let darkMod = $state(false);
	let isFullscreen = $state(false);

	function updateFullscreenStatus() {
		isFullscreen = !!document.fullscreenElement;
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}

	function toggleDarkMode() {
		toggleMode();
	}

	// Initialisation de darkMod et des écouteurs d'événements dans onMount
	$effect(() => {
		let darkModeLocal = localStorage.getItem(DARK_MODE_KEY);
		if (darkModeLocal) {
			darkMod = darkModeLocal === 'dark';
		} else {
			// Utiliser la préférence système si aucune préférence n'est définie
			darkMod = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		// Initialiser l'état du plein écran
		isFullscreen = !!document.fullscreenElement;

		document.addEventListener('fullscreenchange', updateFullscreenStatus);

		// Raccourci clavier F11 pour le plein écran
		const keydownHandler = (e) => {
			if (e.key === 'F11') {
				e.preventDefault();
				toggleFullscreen();
			}
		};
		window.addEventListener('keydown', keydownHandler);

		// Nettoyage des écouteurs lors de la destruction du composant
		return () => {
			document.removeEventListener('fullscreenchange', updateFullscreenStatus);
			window.removeEventListener('keydown', keydownHandler);
		};
	});
</script>

<!-- Ajoutez le Tooltip.Provider ici -->
<Tooltip.Provider>
	<Sidebar.Root collapsible="icon">
		<!-- En-tête de la Sidebar -->
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem class="flex items-center w-full py-5">
					<Sidebar.MenuButton size="lg" class="md:h-8 md:p-0">
						{#snippet child({ props })}
							<a href="/" {...props}>
								<div
									class="text-sidebar-primary-foreground flex items-center justify-center rounded-lg w-10 h-10"
								>
									<LogoSvelte />
								</div>
								{#if sidebar.state === 'expanded'}
									<div class="ml-2 flex flex-col">
										<span class="truncate text-xl font-semibold leading-4">BoilerPlate</span>
										<span class="truncate text-lg text-gray-500 leading-4">SvelteKit</span>
									</div>
								{/if}
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>

		<!-- Contenu de la Sidebar -->
		<Sidebar.Content class="truncate">
			{@render SidebarGroup('CRUD', DatabaseIcon, crudItems)}
			{@render SidebarGroup('Authentication', LockIcon, AuthItems)}
			{@render SidebarGroup('State Manager', SettingsIcon, stateItems)}
			{@render SidebarGroup('UX/UI', LayoutDashboardIcon, UIUXItems)}
		</Sidebar.Content>

		<!-- Footer de la Sidebar -->
		<Sidebar.Footer class="p-0">
			<Sidebar.Group class="p-3 rounded">
				<div class="flex row space-y-2 between justify-between content-start">
					<!-- Switch pour le mode sombre -->
					{#if sidebar.state === 'expanded'}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="p-0 m-0">
											<div class="flex items-center w-full">
												{#if sidebar.state === 'expanded'}
													<SunIcon class="h-5 w-5 text-yellow-500" />
													<Switch bind:checked={darkMod} onclick={toggleDarkMode} class="mx-2" />
													<MoonIcon class="h-5 w-5 text-gray-500" />
												{:else}
													<Switch bind:checked={darkMod} onclick={toggleDarkMode} class="mx-auto" />
												{/if}
											</div>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Sidebar.Menu>
							</Tooltip.Trigger>
							<Tooltip.Content side="right" align="center">
								<p>Mode Sombre</p>
							</Tooltip.Content>
						</Tooltip.Root>
					{/if}

					<!-- Bouton pour le plein écran -->
					{#if sidebar.state === 'expanded'}
						<Tooltip.Root>
							<Tooltip.Trigger style="margin-top: 0px !important;">
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="p-0 m-0">
											<div class="flex items-center w-full">
												{#if sidebar.state === 'expanded'}
													<Maximize2Icon class="h-5 w-5" />
													<Switch checked={isFullscreen} onclick={toggleFullscreen} class="mx-2" />
													<Minimize2Icon class="h-5 w-5" />
												{:else}
													<Switch
														checked={isFullscreen}
														onclick={toggleFullscreen}
														class="mx-auto"
													/>
												{/if}
											</div>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Sidebar.Menu>
							</Tooltip.Trigger>
							<Tooltip.Content side="right" align="center">
								<p>Plein Écran</p>
							</Tooltip.Content>
						</Tooltip.Root>
					{/if}
				</div>
			</Sidebar.Group>

			<!-- Options du footer -->
		</Sidebar.Footer>
	</Sidebar.Root>
</Tooltip.Provider>

{#snippet SidebarGroup(title: any, icon: any, items: any)}
	<Sidebar.Group class="rounded">
		<Collapsible.Root class="group/collapsible">
			<Tooltip.Root>
				<Tooltip.Trigger class="flex items-center w-full justify-center rounded-md">
					<Collapsible.Trigger class="flex items-center w-full justify-center">
						<svelte:component this={icon} class="w-5 h-5" />
						{#if sidebar.state === 'expanded'}
							<span class="ml-4 text-base">{title}</span>
							<ChevronDown
								class="w-3 h-3 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						{/if}
					</Collapsible.Trigger>
				</Tooltip.Trigger>
				{#if sidebar.state === 'collapsed'}
					<Tooltip.Content side="right" align="center">
						<p>{title}</p>
					</Tooltip.Content>
				{/if}
			</Tooltip.Root>

			<Collapsible.Content>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item}
							<Tooltip.Root>
								<Tooltip.Trigger class="flex items-center w-full justify-center">
									<Sidebar.MenuItem class="flex items-center w-full">
										<Sidebar.MenuButton isActive={$page.url.pathname === item.url} class="pl-8">
											<a href={item.url} class="flex items-center w-full">
												<svelte:component this={item.icon} class="w-4 h-4" />
												{#if sidebar.state === 'expanded'}
													<span class="ml-3 text-s">{item.title}</span>
												{/if}
											</a>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								</Tooltip.Trigger>
								{#if sidebar.state === 'collapsed'}
									<Tooltip.Content side="right" align="center">
										<p>{item.title}</p>
									</Tooltip.Content>
								{/if}
							</Tooltip.Root>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Collapsible.Content>
		</Collapsible.Root>
	</Sidebar.Group>
{/snippet}
