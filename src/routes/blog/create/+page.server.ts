import { prisma } from '$lib/server';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { createPostSchema } from '$lib/schema/blog/articleSchema.js';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(createPostSchema));

	const categories = await prisma.category.findMany({ select: { id: true, name: true } });
	const tags = await prisma.tag.findMany({ select: { id: true, name: true } });

	return { form, categories, tags };
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData, 'formData');
		const form = await superValidate(formData, zod(createPostSchema));
		console.log(form, 'form');

		if (!form.valid) {
			return fail(400, { form, error: 'Données invalides' });
		}

		try {
			// Créer un nouvel auteur
			const author = await prisma.author.create({
				data: {
					name: form.data.authorName
				}
			});

			// Créer un nouvel article avec plusieurs catégories et tags
			await prisma.post.create({
				data: {
					title: form.data.title,
					content: form.data.content,
					slug: form.data.title.toLowerCase().replace(/ /g, '-'),
					published: form.data.published,
					authorId: author.id,
					categories: {
						connect: form.data.categories.map((id) => ({ id }))
					},
					tags: {
						connect: form.data.tags?.map((id) => ({ id }))
					}
				}
			});

			return message(form, 'Article et auteur créés avec succès');
		} catch (error) {
			console.error("Erreur lors de la création de l'article:", error);
			return fail(500, { form, error: "Échec de la création de l'article et de l'auteur" });
		}
	}
};
