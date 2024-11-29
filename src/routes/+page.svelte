<script>
	import { Button } from '$lib/components/shadcn/ui/button';
</script>

<section class="flex min-h-screen items-center justify-center bg-gray-900 text-white">
	<div class="container text-center">
		<!-- Header -->
		<h1 class="text-5xl font-extrabold leading-tight sm:text-6xl">
			Bienvenue sur le <span class="text-blue-500">Boilerplate SvelteKit 2025</span>
		</h1>
		<p class="mt-4 text-lg text-gray-300 sm:text-xl">
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
	</div>
</section>
