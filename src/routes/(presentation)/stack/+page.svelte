<script>
	import { Separator } from '$lib/components/shadcn/ui/separator';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';

	const technologies = {
		Engine: [
			{
				name: 'SvelteKit',
				description:
					'Un framework moderne pour construire des applications web dynamiques et réactives avec une optimisation du rendu côté serveur (SSR).',
				link: 'https://kit.svelte.dev/'
			}
		],
		'Formulaire et Validation': [
			{
				name: 'Superforms',
				description:
					'Une solution pour gérer les formulaires dans SvelteKit, offrant des fonctionnalités avancées comme la validation côté client et serveur, en synergie avec Zod.',
				link: 'https://github.com/codediodeio/superforms'
			},
			{
				name: 'Zod',
				description:
					'Une bibliothèque TypeScript-first pour la validation de schémas, assurant la sécurité et la cohérence des données manipulées.',
				link: 'https://zod.dev/'
			}
		],
		'Style et Animation': [
			{
				name: 'Threlte',
				description:
					'Une intégration Three.js avec Svelte pour des expériences 3D performantes et réactives.',
				link: 'https://threlte.xyz/'
			},
			{
				name: 'Embla Carousel',
				description:
					'Un carousel léger et personnalisable pour des interfaces utilisateur interactives.',
				link: 'https://www.embla-carousel.com/get-started/svelte/'
			},
			{
				name: 'GSAP',
				description: 'Pour des animations interactives et avancées.',
				link: 'https://gsap.com/'
			},
			{
				name: 'Tailwind CSS',
				description:
					'Un framework CSS utilitaire qui permet de construire des interfaces utilisateur rapidement avec une grande flexibilité dans le style.',
				link: 'https://tailwindcss.com/'
			},
			{
				name: 'Shadcn UI',
				description:
					'Une collection de composants préconçus construits avec Tailwind CSS et Radix, qui permet de rapidement intégrer des composants accessibles et stylisés dans vos projets.',
				link: 'https://shadcn.dev/'
			},
			{
				name: 'smooth-scrollbar',
				description:
					'De quoi faire la gestion de la barre de scroll, mais aussi le petit bonus qui la rend smooth et fluide.',
				link: 'https://idiotwu.github.io/smooth-scrollbar/'
			}
		],
		Authentification: [
			{
				name: 'Lucia',
				description:
					"Solution d'authentification légère avec prise en charge de l'authentification multi-facteurs (M2FA).",
				link: 'https://lucia-auth.com/'
			}
		],
		Paiement: [
			{
				name: 'Stripe',
				description: 'Une plateforme de paiement sécurisée intégrée dans le projet.',
				link: 'https://stripe.com/'
			}
		]
	};
</script>

<section class="overlay flex min-h-screen items-center justify-center relative w-full px-4">
	<!-- SVG Logo -->
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
			d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3
		c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1
		c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"
		/>
		<path
			class="st1"
			d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1
		c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72
		c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7
		c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5
		c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1
		c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1
		c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5
		c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"
		/>
	</svg>

	<div class="flex flex-col absolute top-0 items-center justify-center mt-20 w-full max-w-5xl">
		<h1 class="text-5xl font-light leading-tight sm:text-6xl mb-8">La stack</h1>

		<!-- Disposition en colonnes (masonry) -->
		<div class="columns-3 gap-4 w-full">
			{#each Object.entries(technologies) as [group, techs]}
				<!-- Chaque "carte" -->
				<div class="break-inside-avoid bg-white rounded-lg shadow-md mb-4 p-4">
					<h2 class="text-lg font-semibold mb-2">{group}</h2>
					<Separator class="my-2" />
					{#each techs as tech}
						<div class="mb-4 flex items-start space-x-3">
							<Avatar.Root>
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
								<p class="text-sm text-gray-700">{tech.description}</p>
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	a {
		color: #fd4000;
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

	.overlay {
		position: relative;
		padding: 20px;
	}
</style>
