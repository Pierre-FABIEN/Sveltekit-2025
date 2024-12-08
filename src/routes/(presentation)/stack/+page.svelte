<script lang="ts">
	// English comments inside the code
	import { Separator } from '$lib/components/shadcn/ui/separator';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';

	// Import data
	import { Production, Frontend, Backend, Test } from './data';
	import { fly } from 'svelte/transition';

	// Create an array of sections to render
	const sections = [Frontend, Backend, Production, Test];
</script>

<div class="flex flex-col absolute top-0 items-center justify-center mt-20 w-full max-w-5xl">
	<h1 class="w-[100%] text-left text-9xl font-light leading-tight mb-8 text-[#fd4000]">La stack</h1>

	<!-- Loop through all sections -->
	{#each sections as section}
		<div class="w-full mb-10">
			<h2 class="w-full text-5xl mt-5 text-left font-light leading-tight sm:text-6xl mb-4">
				{section.title}
			</h2>
			<p class="text-left mb-6 text-lg text-gray-600">{section.description}</p>

			<!-- Render groups of technologies -->
			<div class="columns-3 gap-4 w-full">
				{#each Object.entries(section) as [group, techs]}
					<!-- Skip title and description keys -->
					{#if group !== 'title' && group !== 'description'}
						<div class="cards break-inside-avoid rounded-lg shadow-md mb-4 p-4 backdrop-blur-sm">
							<h2 class="text-xl font-semibold mb-2">{group}</h2>
							<Separator class="my-2" />

							<!-- List each technology -->
							{#each techs as tech}
								<div class="mb-4 flex items-start space-x-3">
									<Avatar.Root>
										<Avatar.Image src={tech.image} alt="{tech.name} icon" class="w-10 h-10" />
										<Avatar.Fallback>{tech.name[0]}</Avatar.Fallback>
									</Avatar.Root>
									<div>
										<a
											href={tech.link}
											class="text-blue-600 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											<h3 class="font-medium">{tech.name}</h3>
										</a>
										<p class="text-sm">{tech.description}</p>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}

	<div class="m-8 flex justify-center space-x-4">
		<a href="/installation" class="presentationButton">Installer le projet</a>
	</div>
</div>

<style lang="scss">
	a {
		color: #fd4000;
	}

	.cards {
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: linear-gradient(
			145deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1) 30%,
			rgba(240, 240, 240, 0.05) 70%,
			rgba(220, 220, 220, 0.02)
		);
		backdrop-filter: blur(15px) saturate(150%);
		-webkit-backdrop-filter: blur(15px) saturate(150%);
		border-radius: 16px;
		padding: 20px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
			background: linear-gradient(
				145deg,
				rgba(255, 255, 255, 0.3),
				rgba(255, 255, 255, 0.15) 30%,
				rgba(240, 240, 240, 0.1) 70%,
				rgba(220, 220, 220, 0.007)
			);
		}
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
</style>
