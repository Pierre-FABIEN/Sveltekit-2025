import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const chats = await prisma.chat.findMany();
	return { chats };
}) satisfies PageServerLoad;
