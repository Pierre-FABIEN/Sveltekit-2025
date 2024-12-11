import { z } from 'zod';

export const createPostSchema = z.object({
	authorName: z.string().nonempty("Le nom de l'auteur est obligatoire."), // Chaîne non vide
	categories: z.array(z.string()).default([]), // Tableau de chaînes, par défaut vide
	content: z.string().nonempty('Le contenu est obligatoire.'), // Chaîne non vide
	published: z.boolean().default(false), // Booléen, par défaut false
	tags: z.array(z.string()).default([]), // Tableau de chaînes, par défaut vide
	title: z.string().nonempty('Le titre est obligatoire.') // Chaîne non vide
});

export type Article = z.infer<typeof createPostSchema>;
