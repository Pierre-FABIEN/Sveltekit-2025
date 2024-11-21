import type { PageServerLoad } from './$types';
import { prisma, socio } from '$lib/server';
import { participantSchema } from '$lib/schema/participantsSchema';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	// Charger les participants existants depuis la base de données
	const participants = await prisma.participant.findMany();

	// Initialiser un formulaire Superform avec Zod
	const form = await superValidate(zod(participantSchema));

	return { participants, form };
}) satisfies PageServerLoad;

export const actions = {
	insertParticipant: async ({ request }) => {
		// Récupérer les données du formulaire
		const formData = await request.formData();

		// Valider les données avec Superform et Zod
		const form = await superValidate(formData, zod(participantSchema));

		// Si les données sont invalides, retourner les erreurs au client
		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid data'
			});
		}

		try {
			// Ajouter le participant dans la base de données
			const newParticipant = await prisma.participant.create({
				data: form.data
			});

			console.log(newParticipant, '(newParticipant)');

			// Synchroniser la liste des participants via SocioServer
			const currentParticipants = (await socio.GetPropVal('participants')) || [];
			const updatedParticipants = [...currentParticipants, newParticipant];

			const syncSuccess = await socio.SetPropVal('participants', updatedParticipants);

			if (!syncSuccess) {
				console.error('Échec de la synchronisation avec SocioServer');
				return fail(500, {
					error: 'Failed to sync with SocioServer',
					form
				});
			}

			// Retourner un message de succès
			return message(form, 'Participant added successfully');
		} catch (error) {
			// Gestion des erreurs inattendues
			console.error('Erreur dans insertParticipant:', error);
			return fail(500, {
				error: 'Internal server error',
				form
			});
		}
	}
};
