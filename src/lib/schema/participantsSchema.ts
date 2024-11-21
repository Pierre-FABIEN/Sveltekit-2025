import { z } from 'zod';

export const participantSchema = z.object({
	name: z
		.string()
		.nonempty({ message: 'Le nom est obligatoire.' })
		.min(2, { message: 'Le nom doit comporter au moins 2 caractères.' })
		.max(100, { message: 'Le nom ne peut pas dépasser 100 caractères.' }),
	num: z
		.number({ invalid_type_error: 'Le numéro doit être un nombre.' })
		.min(1, { message: 'Le numéro doit être supérieur ou égal à 1.' })
		.max(9999, { message: 'Le numéro doit être inférieur ou égal à 9999.' })
});

export type Participant = z.infer<typeof participantSchema>;
