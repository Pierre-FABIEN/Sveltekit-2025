<script lang="ts">
	import { MoonIcon, SunIcon, Minimize2Icon, Maximize2Icon } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import { Switch } from '$lib/components/shadcn/ui/switch/index.js';

	const DARK_MODE_KEY = 'mode-watcher-mode';

	// Déterminer dès le départ si on est en mode sombre ou clair
	let darkMod = $state(false);
	let isFullscreen = $state(false);

	const darkModeLocal = localStorage.getItem(DARK_MODE_KEY);
	darkMod = darkModeLocal
		? darkModeLocal === 'dark'
		: window.matchMedia('(prefers-color-scheme: dark)').matches;

	// Appliquer immédiatement les classes sur <html>
	if (darkMod) {
		document.documentElement.classList.add('dark');
		document.documentElement.classList.remove('light');
	} else {
		document.documentElement.classList.remove('dark');
		document.documentElement.classList.add('light');
	}

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
		// Ici, on ne fait plus la détection du thème, on gère juste les events.
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

<div class="flex-col space-x-6 items-center">
	<!-- Mode Sombre -->
	<div class="flex items-center space-x-2 mb-5">
		<SunIcon class="h-5 w-5 text-yellow-500" />
		<Switch bind:checked={darkMod} onclick={toggleDarkMode} />
		<MoonIcon class="h-5 w-5 text-gray-500" />
	</div>

	<!-- Plein Écran -->
	<div class="flex items-center space-x-2" style="margin: 0;">
		<Maximize2Icon class="h-5 w-5" />
		<Switch bind:checked={isFullscreen} onclick={toggleFullscreen} />
		<Minimize2Icon class="h-5 w-5" />
	</div>
</div>
