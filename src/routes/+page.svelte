<script lang="ts">
	import { toast } from 'svelte-sonner';

	let clone: HTMLElement | null;

	// Function to copy text content to clipboard
	const copyToClipboard = () => {
		const textToCopy = 'npm clone https://github.com/Pierre-FABIEN/Sveltekit-2025.git';
		if (textToCopy) {
			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					toast('copied to clipboard!');
				})
				.catch(() => {
					toast.error('Failed to copy text to clipboard.');
				});
		}
	};
</script>

<section class="overlay flex h-screen w-screen items-center justify-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="Layer_1"
		x="0px"
		y="0px"
		viewBox="0 0 98.1 118"
		style="enable-background:new 0 0 98.1 118;"
		xml:space="preserve"
		class="logoSvelte"
	>
		<path
			class="st0"
			d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"
		/>
		<path
			class="st1"
			d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"
		/>
	</svg>
	<div class="flex flex-col h-screen w-screen absolute items-center justify-center">
		<h1 class="w-[100%] text-center text-7xl font-light leading-tight mb-8 text-[#fd4000]">
			Bienvenue sur <br />
			<span>l'ultime Boilerplate SvelteKit</span>
		</h1>
		<div class="container text-center space-y-6 rounded backdrop-blur-sm">
			<p class="description">
				Toutes les solutions <strong>mise en place</strong> pour vous aider a créer une
				<strong>application SvelteKit</strong>
			</p>

			<div class="flex justify-center items-center mt-5">
				<pre id="copy-text" bind:this={clone} class="preStyle">
				<span>clone the repo with npm</span>

				<button class="copyButton" type="button" onclick={copyToClipboard} aria-label="Copy to clipboard">
					<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-book-copy svgStyle">
					  <path d="M2 16V4a2 2 0 0 1 2-2h11" />
					  <path
								d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12"
							/>
					  <path d="M5 14H4a2 2 0 1 0 0 4h1" />
					</svg>
				</button>
				<a
						href="http://https://github.com/Pierre-FABIEN/Sveltekit-2025"
						target="_blank"
						rel="noopener noreferrer"
						class="copyButton">
				<span style="font-size: 0px;">Visit the GitHub repository</span>
					<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-github svgStyle">
						<path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/>
						<path d="M9 18c-4.51 2-5-2-7-2" />
					</svg>
				</a>
			</pre>
			</div>

			<!-- Action Buttons -->
			<div class="mt-8 flex justify-center space-x-4">
				<a href="/presentation" class="presentationButton"> Présentation </a>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.container {
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25); /* Ombre douce pour donner de la profondeur */
		border: 1px solid rgba(255, 255, 255, 0.2); /* Bordure subtile et légère */
		background: linear-gradient(
			145deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1) 30%,
			rgba(240, 240, 240, 0.05) 70%,
			rgba(220, 220, 220, 0.02)
		); /* Dégradé multi-nuances avec des arrêts */
		backdrop-filter: blur(15px) saturate(150%); /* Flou avec saturation pour intensifier les couleurs de fond */
		-webkit-backdrop-filter: blur(15px) saturate(150%); /* Compatibilité Safari */
		border-radius: 16px; /* Coins arrondis pour un look moderne */
		padding: 20px; /* Espacement interne */
		transition:
			transform 0.5s ease,
			box-shadow 0.5s ease;

		&:hover {
			transform: translateY(-5px); /* Soulève légèrement la carte */
			box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3); /* Ombre plus intense au survol */
			background: linear-gradient(
				145deg,
				rgba(255, 255, 255, 0.3),
				rgba(255, 255, 255, 0.15) 30%,
				rgba(240, 240, 240, 0.1) 70%,
				rgba(220, 220, 220, 0.007)
			); /* Accentuation du gradient au survol */
		}

		width: 800px;
		max-width: 80vw;
		padding: 40px 20px;
	}

	.presentationButton {
		padding: 5px 20px;
		border-radius: 5px;
		border: 1px solid #fd4000;
		box-shadow: 0px 0px 5px 2px #82828260;
		display: flex;
		align-items: center;
		justify-content: center;

		font-weight: lighter;
		cursor: pointer;
		transition: all 0.15s ease-in-out;

		&:hover {
			background-color: #fd4000;
		}
	}

	.description {
		line-height: 175%;
		padding: 5px 20px;
		font-size: 18px;
		line-height: 150%;
		font-weight: 200;
		strong {
			color: #fd4000;
		}
	}

	.preStyle {
		background-color: rgba(0, 0, 0, 0.1);
		border: 1px solid #fd4000;
		//filter: drop-shadow(5px 5px 5px #000000);
		box-shadow: 0px 0px 5px 2px #82828260;
		width: min-content;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-radius: 5px;

		.copyButton {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			border: 1px solid #fd4000;
			margin-left: 10px;
			padding: 5px;
			border-radius: 5px;
		}

		.svgStyle {
			stroke: white;
			transition: all 0.15s ease-in-out;
			&:hover {
				stroke: #fd4000;
			}
		}
	}

	.logoSvelte {
		position: absolute;
		top: -10vh;
		left: -10vw;
		height: 100vh;
		z-index: 0;
		.st0 {
			fill: #0f0e2e88;
		}
		.st1 {
			fill: #04031d;
		}
	}

	:global(html.light) .logoSvelte .st1 {
		fill: rgba(255, 255, 255, 0.533);
	}
	:global(html.light) .logoSvelte .st0 {
		fill: rgb(223, 223, 223);
	}

	:global(html.dark) .logoSvelte .st1 {
		fill: #0f0e2e88;
	}
	:global(html.dark) .logoSvelte .st0 {
		fill: #04031d;
	}
</style>
