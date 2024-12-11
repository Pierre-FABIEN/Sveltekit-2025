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

	const {
		form: createPostData,
		enhance: createPostEnhance,
		message: createPostMessage
	} = createPostForm;

	// États réactifs pour les catégories et tags
	let categoriesArray = $state(
		data.categories.map((category) => ({ id: category.id, name: category.name, checked: false }))
	);

	let tagsArray = $state(data.tags.map((tag) => ({ id: tag.id, name: tag.name, checked: false })));

	// Variables pour les nouvelles catégories et tags
	let newCategory = $state('');
	let newTag = $state('');
	let isCategorySheetOpen = $state(false);
	let isTagSheetOpen = $state(false);

	// Actions pour ajouter une nouvelle catégorie
	const saveCategory = () => {
		if (newCategory.trim()) {
			// Vérification des doublons
			const exists = categoriesArray.some(
				(category) => category.name.toLowerCase() === newCategory.toLowerCase()
			);
			if (!exists) {
				categoriesArray.push({ id: null, name: newCategory, checked: true });
				console.log('Nouvelle catégorie ajoutée :', newCategory, categoriesArray);
				newCategory = ''; // Réinitialisation
				isCategorySheetOpen = false; // Fermer la sheet
			} else {
				console.warn(`La catégorie "${newCategory}" existe déjà.`);
			}
		}
	};

	// Actions pour ajouter un nouveau tag
	const saveTag = () => {
		if (newTag.trim()) {
			// Vérification des doublons
			const exists = tagsArray.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase());
			if (!exists) {
				tagsArray.push({ id: null, name: newTag, checked: true });
				console.log('Nouveau tag ajouté :', newTag, tagsArray);
				newTag = ''; // Réinitialisation
				isTagSheetOpen = false; // Fermer la sheet
			} else {
				console.warn(`Le tag "${newTag}" existe déjà.`);
			}
		}
	};
</script>

<div class="mx-auto mt-8 p-8 max-w-10xl">
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
			<!-- Titre -->
			<div>
				<Form.Field name="author" form={createPostForm}>
					<Form.Control>
						<Form.Label class="text-lg font-semibold">Author</Form.Label>
						<Input type="text" name="author" bind:value={$createPostData.author} required />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Accordion.Root type="multiple">
				<Accordion.Item>
					<Accordion.Trigger>
						<span class="text-lg font-semibold">Catégories</span>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-wrap gap-2">
							{#each categoriesArray as category (category.name)}
								<label class="flex items-center gap-2">
									<Checkbox bind:checked={category.checked} />
									{category.name}
								</label>
							{/each}
						</div>
						<Sheet.Root bind:open={isCategorySheetOpen}>
							<Sheet.Trigger>
								<Button variant="outline" size="sm" class="mt-4">+</Button>
							</Sheet.Trigger>
							<Sheet.Content>
								<Sheet.Header>
									<Sheet.Title>Ajouter une Catégorie</Sheet.Title>
								</Sheet.Header>
								<div class="p-4 space-y-4">
									<Input type="text" bind:value={newCategory} placeholder="Nom de la catégorie" />
									<Button onclick={saveCategory}>Enregistrer</Button>
								</div>
							</Sheet.Content>
						</Sheet.Root>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item>
					<Accordion.Trigger>
						<span class="text-lg font-semibold">Tags</span>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-wrap gap-2">
							{#each tagsArray as tag (tag.name)}
								<label class="flex items-center gap-2">
									<Checkbox bind:checked={tag.checked} />
									{tag.name}
								</label>
							{/each}
						</div>
						<Sheet.Root bind:open={isTagSheetOpen}>
							<Sheet.Trigger>
								<Button variant="outline" size="sm" class="mt-4">+</Button>
							</Sheet.Trigger>
							<Sheet.Content>
								<Sheet.Header>
									<Sheet.Title>Ajouter un Tag</Sheet.Title>
								</Sheet.Header>
								<div class="p-4 space-y-4">
									<Input type="text" bind:value={newTag} placeholder="Nom du tag" />
									<Button onclick={saveTag}>Enregistrer</Button>
								</div>
							</Sheet.Content>
						</Sheet.Root>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<div class="flex justify-between">
				<Button type="submit" variant="default" class="px-6 py-2">Créer l'Article</Button>
				<Button class="px-6 py-2" href="/blog">Retour a la liste</Button>
			</div>
		</div>
	</form>
</div>
