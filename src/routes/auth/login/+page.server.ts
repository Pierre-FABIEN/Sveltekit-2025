import { fail, redirect } from '@sveltejs/kit';
import { getUserFromEmail, getUserPasswordHash } from '$lib/lucia/user';
import { RefillingTokenBucket, Throttler } from '$lib/lucia/rate-limit';
import { verifyPasswordHash } from '$lib/lucia/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/lucia/session';

import type { SessionFlags } from '$lib/lucia/session';
import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';

export function load(event: PageServerLoadEvent) {
	if (event.locals.session !== null && event.locals.user !== null) {
		if (!event.locals.user.emailVerified) {
			return redirect(302, '/auth/verify-email');
		}
		if (!event.locals.user.registered2FA) {
			return redirect(302, '/auth/2fa/setup');
		}
		if (!event.locals.session.twoFactorVerified) {
			return redirect(302, '/auth/2fa');
		}
		return redirect(302, '/auth/');
	}
	return {};
}

const throttler = new Throttler<number>([0, 1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

export const actions: Actions = {
	login: async (event: RequestEvent) => {
		// TODO: Assumes X-Forwarded-For is always included.
		const clientIP = event.request.headers.get('X-Forwarded-For');
		if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
			return fail(429, {
				message: 'Too many requests',
				email: ''
			});
		}

		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid or missing fields',
				email: ''
			});
		}
		if (email === '' || password === '') {
			return fail(400, {
				message: 'Please enter your email and password.',
				email
			});
		}

		const user = getUserFromEmail(email);
		if (user === null) {
			return fail(400, {
				message: 'Account does not exist',
				email
			});
		}
		if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
			return fail(429, {
				message: 'Too many requests',
				email: ''
			});
		}
		if (!throttler.consume(user.id)) {
			return fail(429, {
				message: 'Too many requests',
				email: ''
			});
		}
		const passwordHash = getUserPasswordHash(user.id);
		const validPassword = await verifyPasswordHash(passwordHash, password);
		if (!validPassword) {
			return fail(400, {
				message: 'Invalid password',
				email
			});
		}
		throttler.reset(user.id);
		const sessionFlags: SessionFlags = {
			twoFactorVerified: false
		};
		const sessionToken = generateSessionToken();
		const session = createSession(sessionToken, user.id, sessionFlags);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		if (!user.emailVerified) {
			return redirect(302, '/auth/verify-email');
		}
		if (!user.registered2FA) {
			return redirect(302, '/auth/2fa/setup');
		}
		return redirect(302, '/auth/2fa');
	}
};
