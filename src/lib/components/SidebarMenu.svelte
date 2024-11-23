<script lang="ts">
	import LogoSvelte from './LogoSvelte.svelte';
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import { page } from '$app/stores';
	import { useSidebar } from '$lib/components/shadcn/ui/sidebar/index.js';
	import {
		MoonIcon,
		SunIcon,
		NotebookPen,
		LockIcon,
		SettingsIcon,
		LayoutDashboardIcon,
		ChevronDown,
		Minimize2Icon,
		Maximize2Icon,
		Combine,
		HandCoins
	} from 'lucide-svelte';

	import { Collapsible } from 'bits-ui';
	import { toggleMode } from 'mode-watcher';
	import { crudItems, stateItems, UIUXItems, AuthItems, socketItems, stripeItems } from '$lib';

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
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	function toggleDarkMode() {
		toggleMode();
	}

	$effect(() => {
		const darkModeLocal = localStorage.getItem(DARK_MODE_KEY);
		darkMod = darkModeLocal
			? darkModeLocal === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
		isFullscreen = !!document.fullscreenElement;

		document.addEventListener('fullscreenchange', updateFullscreenStatus);

		const keydownHandler = (e) => {
			if (e.key === 'F11') {
				e.preventDefault();
				toggleFullscreen();
			}
		};
		window.addEventListener('keydown', keydownHandler);

		return () => {
			document.removeEventListener('fullscreenchange', updateFullscreenStatus);
			window.removeEventListener('keydown', keydownHandler);
		};
	});
</script>

<Tooltip.Provider>
	<Sidebar.Root collapsible="icon">
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem class="flex items-center w-full py-5">
					<Sidebar.MenuButton size="lg" class="md:h-8 md:p-0">
						<a href="/" class="flex items-center">
							<div
								class="text-sidebar-primary-foreground flex items-center justify-center rounded-lg w-8 h-8"
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
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>

		<Sidebar.Content class="truncate">
			{@render SidebarGroup('CRUD', NotebookPen, crudItems)}
			{@render SidebarGroup('Authentication', LockIcon, AuthItems)}
			{@render SidebarGroup('Websocket', Combine, socketItems)}
			{@render SidebarGroup('State Manager', SettingsIcon, stateItems)}
			{@render SidebarGroup('UX / UI', LayoutDashboardIcon, UIUXItems)}
			{@render SidebarGroup('Stripe', HandCoins, stripeItems)}
		</Sidebar.Content>

		<Sidebar.Footer class="p-0">
			<Sidebar.Group class="p-3 rounded">
				<div class="flex row space-y-2 between justify-between content-start">
					{#if sidebar.state === 'expanded'}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="p-0 m-0">
											<div class="flex items-center w-full">
												<SunIcon class="h-5 w-5 text-yellow-500" />
												<Switch bind:checked={darkMod} onclick={toggleDarkMode} class="mx-2" />
												<MoonIcon class="h-5 w-5 text-gray-500" />
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

					{#if sidebar.state === 'expanded'}
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Sidebar.Menu>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton class="p-0 m-0">
											<div class="flex items-center w-full">
												<Maximize2Icon class="h-5 w-5" />
												<Switch checked={isFullscreen} onclick={toggleFullscreen} class="mx-2" />
												<Minimize2Icon class="h-5 w-5" />
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
		</Sidebar.Footer>
	</Sidebar.Root>
</Tooltip.Provider>

{#snippet SidebarGroup(title: any, Icon: any, items: any)}
	<Sidebar.Group class="rounded">
		<Collapsible.Root class="group/collapsible">
			<Tooltip.Root>
				<Tooltip.Trigger class="flex pb-2 items-center w-full justify-center rounded-md">
					<Collapsible.Trigger class="flex items-center w-full justify-center">
						<Icon class="w-5 h-5" />
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
												<item.icon class="w-4 h-4" />
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
