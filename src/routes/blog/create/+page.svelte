<script lang="ts">
	import * as Form from '$shadcn/form';
	import * as Accordion from '$shadcn/accordion';
	import { Input } from '$shadcn/input';
	import { Button } from '$shadcn/button';
	import Checkbox from '$shadcn/checkbox/checkbox.svelte';
	import * as Sheet from '$shadcn/sheet/index.js';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	// Initialisation du formulaire
	const createPostForm = superForm(data.form);
	const { form: createPostData, enhance: createPostEnhance } = createPostForm;

	// États réactifs pour les catégories et tags
	let categoriesArray = $state(
		data.categories.map((category) => ({ id: category.id, name: category.name, checked: false }))
	);

	let tagsArray = $state(data.tags.map((tag) => ({ id: tag.id, name: tag.name, checked: false })));

	// Variables pour les nouvelles entrées et états des modaux
	let newEntry = $state('');
	let isSheetOpen = $state({ category: false, tag: false });

	// FormData dérivé combinant toutes les valeurs
	let formData = $derived.by(() => ({
		...$createPostData,
		categories: categoriesArray.filter((cat) => cat.checked),
		tags: tagsArray.filter((tag) => tag.checked)
	}));

	$effect(() => console.log('FormData:', formData));

	// Fonction générique pour ajouter une nouvelle catégorie ou tag
	const saveEntry = (type: 'category' | 'tag') => {
		// Sélectionne le bon tableau (categoriesArray ou tagsArray)
		const array = type === 'category' ? categoriesArray : tagsArray;
		const newValue = newEntry.trim(); // Pas besoin de $ ici

		if (newValue) {
			// Vérifie si l'entrée existe déjà
			const exists = array.some((item) => item.name.toLowerCase() === newValue.toLowerCase());
			if (!exists) {
				// Ajoute une nouvelle entrée
				array.push({ id: null, name: newValue, checked: true });

				console.log(`Nouvelle ${type} ajoutée :`, newValue, array);

				// Réinitialise les champs
				newEntry = ''; // Réinitialise le champ d'entrée
				isSheetOpen[type] = false; // Ferme la modal correspondante
			} else {
				console.warn(`La ${type} "${newValue}" existe déjà.`);
			}
		} else {
			console.warn(`Le champ ${type} est vide.`);
		}
	};
</script>

<div class="mx-auto mt-8 p-8 max-w-6xl">
	<form
		method="POST"
		action="?/create"
		use:createPostEnhance
		class="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8"
	>
		<!-- Colonne gauche -->
		<div class="space-y-6">
			<!-- Titre -->
			<Form.Field name="title" form={createPostForm}>
				<Form.Control>
					<Form.Label class="text-lg font-semibold">Titre</Form.Label>
					<Input type="text" name="title" bind:value={$createPostData.title} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Contenu -->
			<Form.Field name="content" form={createPostForm}>
				<Form.Control>
					<Form.Label class="text-lg font-semibold">Contenu</Form.Label>
					<textarea
						name="content"
						bind:value={$createPostData.content}
						rows="16"
						class="w-full p-4 border rounded-md"
						required
					></textarea>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<!-- Colonne droite -->
		<div class="space-y-6">
			<!-- Auteur -->
			<Form.Field name="author" form={createPostForm}>
				<Form.Control>
					<Form.Label class="text-lg font-semibold">Auteur</Form.Label>
					<Input type="text" name="author" bind:value={$createPostData.author} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- Accordion pour Catégories et Tags -->
			<Accordion.Root type="multiple">
				{#each ['category', 'tag'] as type}
					<Accordion.Item>
						<Accordion.Trigger>
							<span class="text-lg font-semibold">
								{type === 'category' ? 'Catégories' : 'Tags'}
							</span>
						</Accordion.Trigger>
						<Accordion.Content>
							<div class="flex flex-wrap gap-2">
								{#each type === 'category' ? categoriesArray : tagsArray as item (item.name)}
									<label class="flex items-center gap-2">
										<Checkbox bind:checked={item.checked} />
										{item.name}
									</label>
								{/each}
							</div>
							<Sheet.Root bind:open={isSheetOpen[type]}>
								<Sheet.Trigger>
									<Button variant="outline" size="sm" class="mt-4">+</Button>
								</Sheet.Trigger>
								<Sheet.Content>
									<Sheet.Header>
										<Sheet.Title>
											Ajouter {type === 'category' ? 'une Catégorie' : 'un Tag'}
										</Sheet.Title>
									</Sheet.Header>
									<div class="p-4 space-y-4">
										<Input
											type="text"
											bind:value={newEntry}
											placeholder={`Nom ${type === 'category' ? 'de la catégorie' : 'du tag'}`}
										/>
										<Button onclick={(e) => (e.preventDefault(), saveEntry(type))}>
											Enregistrer
										</Button>
									</div>
								</Sheet.Content>
							</Sheet.Root>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>

			<!-- Boutons d'action -->
			<div class="flex justify-between">
				<Button type="submit" variant="default" class="px-6 py-2">Créer l'Article</Button>
				<Button variant="secondary" class="px-6 py-2" href="/blog">Retour à la Liste</Button>
			</div>
		</div>
	</form>
</div>
