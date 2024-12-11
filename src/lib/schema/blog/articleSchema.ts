import { z } from 'zod';

export const createPostSchema = z.object({
	title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
	content: z.string().min(20, 'Le contenu doit contenir au moins 20 caractères'),
	authorName: z.string().min(1, "Un nom d'auteur est requis"),
	categories: z.array(z.string()).min(1, 'Au moins une catégorie doit être sélectionnée'),
	tags: z.array(z.string()).optional(),
	published: z.boolean()
});

export type Article = z.infer<typeof createPostSchema>;
