import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const participants = await prisma.participant.findMany();
	return { participants };
}) satisfies PageServerLoad;
