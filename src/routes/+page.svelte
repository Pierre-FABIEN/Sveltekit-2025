<script>
	import { Button } from '$lib/components/shadcn/ui/button';
</script>

<section class="flex min-h-screen items-center justify-center">
	<div class="container text-center">
		<!-- Header -->
		<h1 class="text-5xl font-extrabold leading-tight sm:text-6xl">
			Bienvenue sur le <br /><span class="">Boilerplate SvelteKit 2025</span>
		</h1>
		<p class="mt-4 text-lg sm:text-xl">
			Accélérez le développement de vos applications avec un setup moderne et performant.
		</p>
		<!-- Action Buttons -->
		<div class="mt-8 flex justify-center space-x-4">
			<Button href="/home/presentation" variant="default" size="lg">Présentation</Button>
			<Button
				href="https://github.com/Pierre-FABIEN/Sveltekit-2025"
				target="_blank"
				variant="secondary"
				size="lg"
			>
				Voir sur GitHub
			</Button>
		</div>
		<pre class="bg-gray-700 p-4 rounded text-sm text-green-300">
			npm clone https://github.com/Pierre-FABIEN/Sveltekit-2025.git
		</pre>
	</div>
</section>

<section
	class="flex-col min-h-screen items-center justify-center place-content-center place-items-center"
>
	<h1 class="text-5xl font-extrabold leading-tight sm:text-6xl">Qu'est-ce que ce boilerplate ?</h1>

	<p class="mt-8 text-lg sm:text-xl w-[60%] mx-auto text-justify">
		Travailler avec ce boilerplate, c’est bénéficier d’une structure complète et optimisée qui vous
		permet de vous concentrer sur l’essentiel : construire votre application. Grâce à l’intégration
		de technologies modernes comme SvelteKit, Prisma, et Tailwind CSS, et à des scripts prêts à
		l’emploi pour le développement, les tests, et la mise en production, vous avancez rapidement
		sans avoir à réfléchir aux configurations de base. Tout est pensé pour accélérer votre workflow
		: des environnements configurés avec des variables clés, des outils de formatage et de linting
		pour garantir un code propre, des pipelines de tests automatisés pour assurer la qualité, et des
		fonctionnalités prêtes pour le SEO, les paiements, et l'authentification. Ce boilerplate est
		votre allié pour gagner en productivité et en sérénité, en éliminant les frictions liées aux
		décisions architecturales générales.
	</p>

	<Button href="/home/presentation" variant="default" size="lg" class="mt-8">En savoir plus</Button>
</section>
