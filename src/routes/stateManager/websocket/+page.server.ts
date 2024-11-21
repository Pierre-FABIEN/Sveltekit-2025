import type { PageServerLoad } from './$types';
import { prisma, socio } from '$lib/server';

export const load = (async () => {
	const participants = await prisma.participant.findMany();
	return { participants };
}) satisfies PageServerLoad;

export const actions = {
	insertParticipant: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const num = parseInt(formData.get('num')?.toString() ?? '0', 10);

		if (!name || isNaN(num)) {
			return { error: 'Invalid input' };
		}

		const newParticipant = await prisma.participant.create({ data: { name, num } });

		console.log(newParticipant, '(newParticipant');

		const currentParticipants = (await socio.GetPropVal('participants')) || [];
		console.log('Participants actuels via GetPropVal :', currentParticipants);

		const updatedParticipants = [...currentParticipants, newParticipant];
		const success = await socio.SetPropVal('participants', updatedParticipants);
		if (!success) {
			console.error('Échec de la synchronisation avec SocioServer');
		} else {
			console.log('Synchronisation réussie :', updatedParticipants);
		}

		// Retourner un objet cohérent
		return { success: true, participant: newParticipant };
	}
};
