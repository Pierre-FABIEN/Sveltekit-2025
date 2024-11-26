import { RefillingTokenBucket } from '$lib/lucia/rate-limit';
import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from '$lib/lucia/session';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { getIoInstance } from '$lib/server/index'; // Importer l'instance Socket.io

const bucket = new RefillingTokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	const clientIP = event.request.headers.get('X-Forwarded-For') ?? '';
	if (!bucket.consume(clientIP, 1)) {
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

const webSocketHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/socket.io/')) {
		getIoInstance(); // Assure que l'instance Socket.io est initialisée
		return new Response(); // Socket.io gère cette requête
	}

	return resolve(event);
};

export const handle = sequence(rateLimitHandle, authHandle, webSocketHandle);
