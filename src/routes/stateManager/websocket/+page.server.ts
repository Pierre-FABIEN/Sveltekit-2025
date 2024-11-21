import { prisma } from '$lib/server';
import type { PageServerLoad, Actions } from './$types';
import { SocioServer } from 'socio/dist/core-server.js';

export const load = (async () => {
	const participants = await prisma.participant.findMany();

	return {
		participants
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	insertUser: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const num = parseInt(formData.get('num')?.toString() ?? '0', 10);

		if (!name || isNaN(num)) {
			return { error: 'Invalid input' };
		}

		// Insertion dans la base de données via Prisma
		const newUser = await prisma.participant.create({
			data: {
				name,
				num
			}
		});

		return { success: true };
	}
};
