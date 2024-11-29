<section class="home">
	<div class="mt-10 mb-10 column justify-center">
		<article class="m-2 w-full max-w-4xl rounded-lg border p-8">
			<h1 class="mb-4 text-4xl font-bold">Boilerplate Sveltekit 2025</h1>
			<p class="mb-6">
				<span class="mr-2 inline-block rounded bg-blue-500 px-2 py-1 text-sm font-bold text-white"
					>version 0.5</span
				>
				<span class="mr-2 inline-block rounded bg-green-500 px-2 py-1 text-sm font-bold text-white"
					>license MIT</span
				>
				<span class="mr-2 inline-block rounded bg-green-600 px-2 py-1 text-sm font-bold text-white"
					>PRs welcome</span
				>
			</p>

			<h2 class="mb-3 text-2xl font-semibold">Description</h2>
			<p class="mb-6 text-lg leading-relaxed">
				<strong>Boilerplate SvelteKit 2025</strong> est un projet web full-stack moderne qui vise à accélérer
				le développement d'applications performantes, sécurisées et évolutives. Il combine des technologies
				de pointe pour gérer à la fois le front-end, le back-end et les services connexes.
			</p>

			<h2 class="mb-3 text-2xl font-semibold">Ce boilerplate offre :</h2>
			<ul class="list-disc pl-6 space-y-2 text-lg leading-relaxed">
				<li>
					Une architecture modulaire avec gestion des états (state) avancée, intégration WebSocket
					et microservices.
				</li>
				<li>
					Des fonctionnalités 3D optimisées grâce à <strong>Threlte</strong> et un rendu fluide via
					<strong>Embla Carousel</strong>.
				</li>
				<li>
					Une sécurité renforcée avec <strong>Lucia</strong> (authentification MFA).
				</li>
				<li>
					Une gestion simplifiée des paiements avec <strong>Stripe</strong>.
				</li>
				<li>Un SEO optimisé grâce à la génération automatique de sitemap.</li>
			</ul>

			<p class="mt-6 text-lg leading-relaxed">
				Ce projet propose également une configuration clé en main pour les outils de tests, la
				gestion des données, les animations et le styling.
			</p>

			<h2 class="mb-3 text-2xl font-semibold mt-10">Technologies Utilisées</h2>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🚀 Front-End</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://kit.svelte.dev/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">SvelteKit</a
					> : Un framework moderne pour construire des applications web dynamiques et réactives avec
					une optimisation du rendu côté serveur (SSR).
				</li>
				<li class="text-lg">
					<a
						href="https://threlte.xyz/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Threlte</a
					>: Une intégration Three.js avec Svelte pour des expériences 3D performantes et réactives.
				</li>
				<li class="text-lg">
					<a
						href="https://www.embla-carousel.com/get-started/svelte/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Embla Carousel</a
					>: Un carousel léger et personnalisable pour des interfaces utilisateur interactives.
				</li>

				<li class="text-lg">Sitemap: Génération automatique de sitemap pour améliorer le SEO.</li>

				<li class="text-lg">
					<a
						href="https://github.com/suhaildawood/SvelteKit-integrated-WebSocket"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">WebSocket</a
					>
					: Utilisé pour la gestion des événements en temps réel entre les microservices.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🗄️ Back-End & ORM</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://www.prisma.io/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Prisma</a
					> : Un ORM moderne qui facilite les interactions avec la base de données, ici utilisée avec
					MongoDB, offrant un typage strict et des opérations CRUD simplifiées.
				</li>
				<li class="text-lg">
					<a
						href="https://www.mongodb.com/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">MongoDB</a
					> : Une base de données NoSQL flexible, idéale pour les applications évolutives nécessitant
					une grande flexibilité dans la structure des données.
				</li>
				<li class="text-lg">
					<a
						href="https://github.com/suhaildawood/SvelteKit-integrated-WebSocket"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">WebSocket</a
					>
					: Utilisé pour la gestion des événements en temps réel entre les microservices.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">💳 Paiements & Authentification</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://stripe.com/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Stripe</a
					>: Une plateforme de paiement sécurisée intégrée dans le projet.
				</li>
				<li class="text-lg">
					<a
						href="https://lucia-auth.com/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Lucia</a
					>: Solution d'authentification légère avec prise en charge de l'authentification
					multi-facteurs (M2FA).
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🔍 Validation & Gestion des Formulaires</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://zod.dev/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Zod</a
					> : Une bibliothèque TypeScript-first pour la validation de schémas, assurant la sécurité et
					la cohérence des données manipulées.
				</li>
				<li class="text-lg">
					<a
						href="https://github.com/codediodeio/superforms"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Superforms</a
					> : Une solution pour gérer les formulaires dans SvelteKit, offrant des fonctionnalités avancées
					comme la validation côté client et serveur, en synergie avec Zod.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🛠️ Tests</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://playwright.dev/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Playwright</a
					> : Un outil puissant pour les tests End-to-End (E2E), simulant les actions des Directors à
					travers différents navigateurs pour garantir la fiabilité de l'application.
				</li>
				<li class="text-lg">
					<a
						href="https://vitest.dev/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Vitest</a
					> : Un framework de tests unitaires rapide et léger, basé sur Vite, pour s'assurer que chaque
					composant fonctionne correctement de manière isolée.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🎨 Styling</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://tailwindcss.com/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Tailwind CSS</a
					> : Un framework CSS utilitaire qui permet de construire des interfaces utilisateur rapidement
					avec une grande flexibilité dans le style.
				</li>
				<li class="text-lg">
					<a
						href="https://shadcn.dev/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Shadcn UI</a
					> : Une collection de composants préconçus construits avec Tailwind CSS et Radix, qui permet
					de rapidement intégrer des composants accessibles et stylisés dans vos projets.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">💻 Langage & Typage</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://www.typescriptlang.org/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">TypeScript</a
					> : Un sur-ensemble de JavaScript qui ajoute le typage statique, améliorant la qualité et la
					divtenabilité du code.
				</li>
			</ul>

			<h3 class="mb-2 mt-10 text-2xl font-medium">🔧 Linting & Formatage</h3>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<a
						href="https://eslint.org/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">ESLint</a
					> : Un outil d'analyse statique qui identifie et corrige les problèmes dans le code JavaScript
					et TypeScript.
				</li>
				<li class="text-lg">
					<a
						href="https://prettier.io/"
						class="text-blue-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer">Prettier</a
					> : Un formateur de code qui garantit un style de code cohérent et propre à travers l'ensemble
					du projet.
				</li>
			</ul>
		</article>
	</div>
</section>

<style>
	.home {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
