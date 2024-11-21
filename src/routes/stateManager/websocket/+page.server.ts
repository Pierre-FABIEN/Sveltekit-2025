import type { PageServerLoad, Actions } from './$types';
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

		// Ajoutez un participant dans la base de données
		const newParticipant = await prisma.participant.create({ data: { name, num } });

		// Vérifiez que la propriété existe dans socio.props
		const currentParticipants = socio.props?.['participants'] || [];
		const updatedParticipants = [...currentParticipants, newParticipant];

		// Synchronisez la propriété avec SocioServer
		await socio.SetPropVal('participants', updatedParticipants);

		return { success: true };
	}
};
