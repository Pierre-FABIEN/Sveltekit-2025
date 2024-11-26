<section class="home">
	<div class="mt-10 column justify-center">
		<article class="m-2 w-full max-w-4xl rounded-lg border p-8">
			<h1 class="mb-4 text-4xl font-bold">Présentation du test</h1>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold">
					1. CRUD pour les Directeurs, Agences et Produits
				</h2>
				<p class=" mb-4">
					Ce projet vise à gérer une base de données MongoDB contenant des informations sur des
					directeurs, des agences, et des produits, en utilisant Prisma comme ORM pour simplifier
					les opérations CRUD (Create, Read, Update, Delete). Le projet inclut les modèles <strong
						>Director</strong
					>, <strong>Agence</strong>, et <strong>Product</strong>, ainsi que leurs relations.
				</p>

				<div class="mb-4 ml-4">
					<h3 class="mb-2 text-xl font-semibold">Directeur</h3>
					<p class="">
						Le modèle <strong>Director</strong> représente les directeurs d'agences. Chaque directeur
						a un identifiant unique, un nom, un email, un âge, une date de création, et un statut d'activité.
						Le directeur peut être associé à plusieurs agences.
					</p>
				</div>

				<div class="mb-4 ml-4">
					<h3 class="mb-2 text-xl font-semibold">Agence</h3>
					<p class="">
						Le modèle <strong>Agence</strong> représente les agences associées à un directeur. Chaque
						agence possède une adresse complète (rue, ville, état, code postal, pays), une date de création,
						et une relation avec un directeur. Les agences peuvent également être associées à plusieurs
						produits.
					</p>
				</div>

				<div class="mb-4 ml-4">
					<h3 class="mb-2 text-xl font-semibold">Produit</h3>
					<p class="">
						Le modèle <strong>Product</strong> représente les produits disponibles dans une agence. Chaque
						produit a un nom, un stock, un prix, une date de création, et une relation avec une agence.
					</p>
				</div>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold">2. Relations entre les modèles</h2>
				<p class=" mb-4">
					- Un <strong>Directeur</strong> peut avoir plusieurs <strong>Agences</strong> (relation
					un-à-plusieurs).<br />
					- Une <strong>Agence</strong> peut avoir plusieurs <strong>Produits</strong> (relation
					un-à-plusieurs).<br />
					- Une <strong>Agence</strong> est liée à un seul <strong>Directeur</strong> (relation
					plusieurs-à-un).<br />
					- Un <strong>Produit</strong> est lié à une seule <strong>Agence</strong> (relation plusieurs-à-un).
				</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold">
					3. Visualisation des Stocks et Agences avec ApexCharts
				</h2>
				<p class="">
					Une des fonctionnalités clés du projet inclura l'utilisation d'<strong>ApexCharts</strong>
					pour visualiser les données liées aux stocks de produits dans les différentes agences. Cela
					permettra de générer des graphiques dynamiques montrant, par exemple :
				</p>
				<ul class="ml-4 list-inside list-disc">
					<li>La répartition des stocks de produits par agence.</li>
					<li>L'évolution du stock de produits dans le temps.</li>
				</ul>
				<p class=" mt-4">
					Ces visualisations aideront à comprendre rapidement la distribution des produits et à
					prendre des décisions informées.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="mb-4 text-2xl font-semibold">
					4. API pour requêtes d'adresses avec OpenCage Data
				</h2>
				<p class="">
					Le projet inclura également une API qui permet de récupérer des informations géographiques
					basées sur les adresses des agences. Cette API utilisera le service <strong
						>OpenCage Data</strong
					> pour obtenir des informations comme les coordonnées géographiques, ou d'autres détails géolocalisés.
					Cette fonctionnalité peut être utilisée pour améliorer la précision des données d'adresse,
					ou pour des analyses géographiques avancées des agences.
				</p>
			</section>

			<footer>
				<p class="">
					Le projet met en place une gestion efficace des directeurs, agences, et produits avec des
					relations bien définies et des outils de visualisation et d'intégration de données
					externes puissants. L'usage de Prisma pour MongoDB simplifie le travail avec la base de
					données, tandis que l'intégration de l'API OpenCage Data et ApexCharts enrichit
					l'expérience utilisateur en offrant des fonctionnalités supplémentaires pour l'analyse et
					la visualisation des données.
				</p>
			</footer>

			<div class="flex flex-col items-center p-8">
				<div class="mb-8 rounded-lg border border-gray-300 bg-white p-4 shadow-md">
					<h2 class="mb-4 text-center text-lg font-semibold text-gray-700">Director</h2>
					<ul class="list-inside list-disc text-black">
						<li>id (String)</li>
						<li>name (String)</li>
						<li>email (String)</li>
						<li>age (Int)</li>
						<li>createdAt (DateTime)</li>
						<li>isActive (Boolean)</li>
					</ul>
				</div>

				<div class="mb-8 h-16 w-1 bg-gray-500"></div>

				<div class="flex space-x-8">
					<div class="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
						<h2 class="mb-4 text-center text-lg font-semibold text-gray-700">Agence</h2>
						<ul class="list-inside list-disc text-black">
							<li>id (String)</li>
							<li>street (String)</li>
							<li>city (String)</li>
							<li>state (String)</li>
							<li>zip (String)</li>
							<li>country (String)</li>
							<li>createdAt (DateTime)</li>
							<li>directorId (String)</li>
						</ul>
					</div>

					<div class="flex flex-col items-center">
						<div class="h-1 w-16 bg-gray-500"></div>
						<div class="mt-8 h-16 w-1 bg-gray-500"></div>
					</div>

					<div class="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
						<h2 class="mb-4 text-center text-lg font-semibold text-gray-700">Product</h2>
						<ul class="list-inside list-disc text-black">
							<li>id (String)</li>
							<li>name (String)</li>
							<li>stock (Int)</li>
							<li>price (Float)</li>
							<li>createdAt (DateTime)</li>
							<li>agenceId (String)</li>
						</ul>
					</div>
				</div>
			</div>
		</article>

		<article class="m-2 w-full max-w-4xl rounded-lg border p-8">
			<h1 class="mb-4 text-4xl font-bold">Test</h1>
			<p class="mb-6">
				<span class="mr-2 inline-block rounded bg-blue-500 px-2 py-1 text-sm font-bold text-white"
					>version 0.0.1</span
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
				<strong>Test</strong> est un projet web moderne qui combine les meilleures technologies pour
				développer une application web performante et évolutive. Il repose sur
				<strong>SvelteKit</strong>
				pour le front-end, <strong>Prisma</strong> et <strong>MongoDB</strong> pour la gestion des
				données, ainsi que <strong>Playwright</strong> pour les tests E2E. Ce projet met également l'accent
				sur une configuration complète pour un développement efficace et sécurisé.
			</p>

			<h2 class="mb-3 text-2xl font-semibold">Technologies Utilisées</h2>

			<h3 class="mb-2 mt-4 text-xl font-medium">🚀 Front-End</h3>
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
			</ul>

			<h3 class="mb-2 mt-4 text-xl font-medium">🗄️ Back-End & ORM</h3>
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
			</ul>

			<h3 class="mb-2 mt-4 text-xl font-medium">🔍 Validation & Gestion des Formulaires</h3>
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

			<h3 class="mb-2 mt-4 text-xl font-medium">🛠️ Tests</h3>
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

			<h3 class="mb-2 mt-4 text-xl font-medium">🎨 Styling</h3>
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

			<h3 class="mb-2 mt-4 text-xl font-medium">💻 Langage & Typage</h3>
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

			<h3 class="mb-2 mt-4 text-xl font-medium">🔧 Linting & Formatage</h3>
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

			<h2 class="mb-3 text-2xl font-semibold">Scripts</h2>
			<p class="mb-4 text-lg leading-relaxed">
				Voici les principaux scripts inclus dans le projet :
			</p>
			<ul class="list-none space-y-2">
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run dev</code> : Lance le serveur de développement.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run build</code> : Génére les fichiers de production
					après avoir généré le client Prisma.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run preview</code> : Lance une prévisualisation
					de l'application en mode production.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run test</code> : Exécute les tests d'intégration
					et les tests unitaires.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run lint</code> : Vérifie la qualité du code avec
					Prettier et ESLint.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run format</code> : Formate tout le code du projet
					avec Prettier.
				</li>
				<li class="text-lg">
					<code class="rounded border px-2 py-1">npm run sampleData</code> : Exécute un script pour injecter
					des données d'exemple dans la base de données.
				</li>
			</ul>

			<h2 class="mb-3 text-2xl font-semibold">Installation et Lancement</h2>
			<p class="text-lg leading-relaxed">
				Pour installer les dépendances et lancer l'application en mode développement :
			</p>
			<pre class="rounded border p-4"><code
					>npm install
	npm run dev</code
				></pre>
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
