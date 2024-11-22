import { PrismaClient } from '@prisma/client';
import { SocioServer } from 'socio/dist/core-server.js';
import type { SocioSession } from 'socio/dist/core-session.js';
import type { id } from 'socio/dist/types';

import { perMessageDeflate } from 'socio/dist/utils.js';

import { SECRET_SECURE_PRIVATE_KEY } from '$env/static/private';

// Initialisation de Prisma
export const prisma = new PrismaClient();

// Configuration SocioServer
export const socio = new SocioServer(
	{ port: 3000, perMessageDeflate },
	{
		db: await SetUpDBInterface(),
		logging: { verbose: true, hard_crash: false }
	}
);

async function SetUpDBInterface() {
	// Retour de l'interface DB compatible avec Socio
	return {
		Query: async (client: SocioSession, id: id, sql: string, params?: any): Promise<object> => {
			// Utilisation de Prisma pour exécuter des requêtes brutes en toute sécurité
			const result = await prisma.$queryRawUnsafe(sql, ...(params ? Object.values(params) : []));
			return result as object; // Cast explicite pour correspondre au type attendu
		}
	};
}
