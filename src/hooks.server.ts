import { RefillingTokenBucket } from '$lib/lucia/rate-limit';
import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from '$lib/lucia/session';
import { sequence } from '@sveltejs/kit/hooks';
import { SocioServer } from 'socio/dist/core-server.js';
import { SocioSecurity } from 'socio/dist/secure.js';
import { perMessageDeflate } from 'socio/dist/utils.js';
import { PrismaClient } from '@prisma/client';
import { log, info, done, soft_error } from 'socio/dist/logging.js';

import type { Handle } from '@sveltejs/kit';
import type { SocioSession } from 'socio/core-session.js';

const prisma = new PrismaClient();
const bucket = new RefillingTokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	const clientIP = event.request.headers.get('X-Forwarded-For');
	if (!clientIP) {
		return resolve(event);
	}

	const cost = event.request.method === 'GET' || event.request.method === 'OPTIONS' ? 1 : 3;

	if (!bucket.consume(clientIP, cost)) {
		return new Response('Too many requests', { status: 429 });
	}

	return resolve(event);
};

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	if (!token) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);
	if (session) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;

	return resolve(event);
};

try {
	info('Starting SocioServer...');

	//constants
	const db_interface = await SetUpDBInterface();

	//load in the secure_private_key with dotenv or smth. Dont hardcode like this
	const socsec = new SocioSecurity({
		secure_private_key: 'skk#$U#Y$7643GJHKGDHJH#$K#$HLI#H$KBKDBDFKU34534',
		logging: { verbose: false }
	});
	const socserv = new SocioServer(
		{ port: 3000, perMessageDeflate },
		{ db: db_interface, logging: { verbose: true, hard_crash: false }, socio_security: socsec }
	);

	socserv.RegisterProp('num', { num: 0 });
} catch (e: any) {
	soft_error(e);
}

async function SetUpDBInterface() {
	// Initialisation des données de test
	await prisma.participant.createMany({
		data: [
			{ name: 'Jane', num: 42 },
			{ name: 'John', num: 69 }
		]
	});

	// Interface Prisma pour les requêtes SQL
	return {
		Query: async (client: SocioSession, id: id, sql: string, params: any) => {
			try {
				// Exemple simple d'utilisation de Prisma pour exécuter les requêtes
				if (sql.trim().startsWith('SELECT * FROM Users')) {
					return await prisma.participant.findMany();
				} else if (sql.trim().startsWith('INSERT INTO Users')) {
					const { name, num } = params;
					return await prisma.participant.create({ data: { name, num } });
				}
				return [];
			} catch (error) {
				console.error('Database query error:', error);
				throw error;
			}
		}
	};
}

export const handle = sequence(rateLimitHandle, authHandle);
