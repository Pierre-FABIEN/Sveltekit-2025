<script>
	import { Button } from '$lib/components/shadcn/ui/button';
</script>

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
				DATABASE_URL=mongodb+srv://*:*@nextboilerplate.kf0vibb.mongodb.net/*?retryWrites=true&w=majority&appName=*
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
