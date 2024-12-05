<section class="bg-gray-900 text-white py-12">
	<div class="container mx-auto px-6 space-y-12">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-4xl font-bold">Installer et Configurer</h1>
			<p class="mt-4 text-gray-300">
				Suivez ces étapes pour configurer et lancer le <span class="text-blue-500"
					>Boilerplate SvelteKit 2025</span
				>.
			</p>
		</div>

		<!-- Étape 1 : Installer les dépendances -->
		<div class="p-6 bg-gray-800 rounded-lg shadow-md">
			<h2 class="text-2xl font-semibold mb-2">1. Installer les dépendances</h2>
			<p class="text-gray-400 mb-4">
				Installez les dépendances nécessaires au projet avec la commande suivante :
			</p>
			<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
				npm install
			</pre>
		</div>

		<!-- Étape 2 : Configurer les variables d'environnement -->
		<div class="p-6 bg-gray-800 rounded-lg shadow-md">
			<h2 class="text-2xl font-semibold mb-2">2. Configurer les variables d'environnement</h2>
			<p class="text-gray-400 mb-4">
				Créez un fichier <code>.env</code> dans la racine du projet et copiez-y les variables suivantes
				:
			</p>
			<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
				DATABASE_URL=mongodb+srv://*:*@*.*.mongodb.net/*?retryWrites=true&w=majority&appName=*
				SECRET_OPENCAGEDATA_KEY=*
				ENCRYPTION_KEY=*
				PUBLIC_ENV='dev'
				
				VITE_GOOGLE_REDIRECT_URI=*
				GOOGLE_CLIENT_ID=*
				GOOGLE_CLIENT_SECRET=*
				
				STRIPE_WEBHOOK_SECRET=*
				STRIPE_SECRET_KEY=*
				VITE_STRIPE_PUBLISHABLE_KEY=*
			</pre>
		</div>

		<div class="p-6 bg-gray-800 rounded-lg shadow-md">
			<h2 class="text-2xl font-semibold mb-4">2. Détails des variables</h2>
			<ul class="list-disc pl-6 space-y-2 text-gray-300">
				<li><strong>DATABASE_URL</strong> : Lien de connexion à votre base de données MongoDB.</li>
				<li>
					<strong>SECRET_OPENCAGEDATA_KEY</strong> : Clé API pour le service OpenCage (utilisé pour les
					adresses).
				</li>
				<li>
					<strong>ENCRYPTION_KEY</strong> : Clé utilisée pour le chiffrement dans l'application.
				</li>
				<li>
					<strong>PUBLIC_ENV</strong> : Spécifie l'environnement actuel (ex. <code>dev</code>,
					<code>production</code>).
				</li>
				<li>
					<strong>VITE_GOOGLE_REDIRECT_URI</strong>, <strong>GOOGLE_CLIENT_ID</strong>,
					<strong>GOOGLE_CLIENT_SECRET</strong> : Informations nécessaires pour l'authentification Google.
				</li>
				<li>
					<strong>STRIPE_WEBHOOK_SECRET</strong>, <strong>STRIPE_SECRET_KEY</strong>,
					<strong>VITE_STRIPE_PUBLISHABLE_KEY</strong> : Clés pour la configuration de Stripe (paiements
					et webhooks).
				</li>
			</ul>
		</div>

		<!-- Étape 3 : Générer le client Prisma -->
		<div class="p-6 bg-gray-800 rounded-lg shadow-md">
			<h2 class="text-2xl font-semibold mb-2">3. Générer le client Prisma</h2>
			<p class="text-gray-400 mb-4">
				Utilisez Prisma pour générer le client nécessaire au projet avec cette commande :
			</p>
			<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
				npx prisma generate
			</pre>
		</div>

		<!-- Étape 4 : Lancer le projet -->
		<div class="p-6 bg-gray-800 rounded-lg shadow-md">
			<h2 class="text-2xl font-semibold mb-2">4. Lancer le projet</h2>
			<p class="text-gray-400 mb-4">
				Une fois toutes les étapes terminées, lancez le serveur en mode développement :
			</p>
			<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
				npm run dev
			</pre>
			<p class="text-gray-300 mt-4">
				Le projet sera accessible sur <a
					href="http://localhost:1000"
					target="_blank"
					class="text-blue-500 underline">http://localhost:1000</a
				>.
			</p>
		</div>
	</div>
</section>

<section class="bg-gray-900 text-white py-12">
	<div class="container mx-auto px-6 space-y-12">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-4xl font-bold">Scripts npm pour le Boilerplate</h1>
			<p class="mt-4 text-gray-300">
				Une explication détaillée des scripts npm inclus dans le projet, leur objectif et leur
				usage.
			</p>
		</div>

		<!-- Liste des scripts -->
		<div class="space-y-6">
			<!-- Script dev -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">1. <code>npm run dev</code></h2>
				<p class="text-gray-400">
					Lance le serveur de développement sur le port <strong>1000</strong>. Il exécute également
					un watcher pour Prettier afin de formater automatiquement le code pendant que vous
					travaillez.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					concurrently "vite dev --port 1000" "npm run prettier:watch"
				</pre>
			</div>

			<!-- Script build -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">2. <code>npm run build</code></h2>
				<p class="text-gray-400">
					Compile le projet pour la production. Génère des fichiers optimisés pour le déploiement.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					vite build
				</pre>
			</div>

			<!-- Script preview -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">3. <code>npm run preview</code></h2>
				<p class="text-gray-400">
					Lance une prévisualisation de la version de production sur un serveur local.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					vite preview
				</pre>
			</div>

			<!-- Script check -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">4. <code>npm run check</code></h2>
				<p class="text-gray-400">
					Synchronise les fichiers SvelteKit et effectue une vérification TypeScript pour détecter
					les erreurs dans le projet.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					svelte-kit sync && svelte-check --tsconfig ./tsconfig.json
				</pre>
			</div>

			<!-- Script lint -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">5. <code>npm run lint</code></h2>
				<p class="text-gray-400">
					Vérifie la qualité du code avec Prettier et ESLint. Ce script s'assure que le code
					respecte les normes définies.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					prettier --check . && eslint .
				</pre>
			</div>

			<!-- Script test -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">6. <code>npm run test</code></h2>
				<p class="text-gray-400">
					Exécute les tests unitaires avec Vitest et les tests E2E avec Playwright.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					npm run test:unit -- --run && npm run test:e2e
				</pre>
			</div>

			<!-- Script seed -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">7. <code>npm run seed</code></h2>
				<p class="text-gray-400">
					Insère des données fictives dans la base de données pour tester le projet.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					node src/lib/server/seed.js
				</pre>
			</div>

			<!-- Script render -->
			<div class="p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 class="text-2xl font-semibold mb-2">8. <code>npm run render</code></h2>
				<p class="text-gray-400">
					Lance le serveur en mode production sur le port <strong>10000</strong>.
				</p>
				<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
					PORT=10000 tsm ./prodServer.ts
				</pre>
			</div>
		</div>
	</div>
</section>
