<script lang="ts">
	import * as Sidebar from '$lib/components/shadcn/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.js';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { useSidebar } from '$lib/components/shadcn/ui/sidebar/index.js';
	import XIcon from 'lucide-svelte/icons/x';
	import { HomeIcon, MoonIcon, SunIcon, ChartNoAxesCombined } from 'lucide-svelte';
	import TransitionIcon from 'lucide-svelte/icons/users';
	import DirectorsIcon from 'lucide-svelte/icons/users';
	import AgenciesIcon from 'lucide-svelte/icons/building';
	import ProductsIcon from 'lucide-svelte/icons/package';
	import SnippetIcon from 'lucide-svelte/icons/code';
	import StateIcon from 'lucide-svelte/icons/database';
	import AuthIcon from 'lucide-svelte/icons/lock';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import { Collapsible } from 'bits-ui';
	import { toggleMode } from 'mode-watcher';

	// Éléments de navigation principale
	const navItems = [
		{
			title: 'Accueil',
			url: '/',
			icon: HomeIcon
		}
	];

	// Éléments de la catégorie CRUD
	const crudItems = [
		{
			title: 'Directors',
			url: '/directors',
			icon: DirectorsIcon
		},
		{
			title: 'Agencies',
			url: '/agencies',
			icon: AgenciesIcon
		},
		{
			title: 'Products',
			url: '/products',
			icon: ProductsIcon
		},
		{
			title: 'Statistical',
			url: '/stats',
			icon: ChartNoAxesCombined
		}
	];

	const stateItems = [
		{
			title: 'Snippet',
			url: '/snippet',
			icon: SnippetIcon
		},
		{
			title: 'State',
			url: '/state',
			icon: StateIcon
		}
	];

	const UIUXItems = [
		{
			title: 'transitionDemo',
			url: '/transitionDemo',
			icon: TransitionIcon
		}
	];

	const AuthItems = [
		{
			title: 'Login',
			url: '/auth/login',
			icon: TransitionIcon
		},
		{
			title: 'Register',
			url: '/auth/signup',
			icon: TransitionIcon
		},

		{
			title: 'Forgot Password',
			url: '/auth/forgot-password',
			icon: TransitionIcon
		},
		{
			title: 'Dashboard',
			url: '/auth',
			icon: TransitionIcon
		},
		{
			title: 'Settings',
			url: '/auth/settings',
			icon: TransitionIcon
		}
	];

	const sidebar = useSidebar();
</script>

<Sidebar.Root collapsible="icon">
	<!-- Sidebar Content -->
	<Sidebar.Content>
		<!-- Groupe de navigation principal -->
		<Sidebar.Group>
			<Sidebar.GroupLabel class="h-[60px]">
				<div class="title">
					<h1
						class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0"
					>
						BoilerPlate<br /> SvelteKit
					</h1>
				</div>
			</Sidebar.GroupLabel>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navItems as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<!-- Groupe pliable pour la catégorie CRUD -->
		<Collapsible.Root open class="group/collapsible">
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{#snippet child({ props })}
						<Collapsible.Trigger {...props}>
							CRUD
							<ChevronDown
								class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						</Collapsible.Trigger>
					{/snippet}
				</Sidebar.GroupLabel>
				<Collapsible.Content>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each crudItems as item}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Collapsible.Content>
			</Sidebar.Group>
		</Collapsible.Root>

		<Collapsible.Root open class="group/collapsible">
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{#snippet child({ props })}
						<Collapsible.Trigger {...props}>
							Authentication
							<ChevronDown
								class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						</Collapsible.Trigger>
					{/snippet}
				</Sidebar.GroupLabel>
				<Collapsible.Content>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each AuthItems as item}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Collapsible.Content>
			</Sidebar.Group>
		</Collapsible.Root>

		<Collapsible.Root open class="group/collapsible">
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{#snippet child({ props })}
						<Collapsible.Trigger {...props}>
							State Manager
							<ChevronDown
								class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						</Collapsible.Trigger>
					{/snippet}
				</Sidebar.GroupLabel>
				<Collapsible.Content>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each stateItems as item}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Collapsible.Content>
			</Sidebar.Group>
		</Collapsible.Root>

		<Collapsible.Root open class="group/collapsible">
			<Sidebar.Group>
				<Sidebar.GroupLabel>
					{#snippet child({ props })}
						<Collapsible.Trigger {...props}>
							UX/UI
							<ChevronDown
								class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						</Collapsible.Trigger>
					{/snippet}
				</Sidebar.GroupLabel>
				<Collapsible.Content>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each UIUXItems as item}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={$page.url.pathname === item.url}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Collapsible.Content>
			</Sidebar.Group>
		</Collapsible.Root>
	</Sidebar.Content>

	<!-- Sidebar Footer -->

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<button {...props} class="m-1 flex items-center w-full" on:click={toggleMode}>
							<SunIcon
								class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<MoonIcon
								class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
						</button>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
