import { createTOTPKeyURI, verifyTOTP } from '@oslojs/otp';
import { fail, redirect } from '@sveltejs/kit';
import { decodeBase64, encodeBase64 } from '@oslojs/encoding';
import { updateUserTOTPKey } from '$lib/lucia/user';
import { setSessionAs2FAVerified } from '$lib/lucia/session';
import { RefillingTokenBucket } from '$lib/lucia/rate-limit';
import { superValidate } from 'sveltekit-superforms';
import { totpSchema } from '$lib/schema/totpSchema';
import { renderSVG } from 'uqr';

import type { Actions, RequestEvent } from './$types';
import { zod } from 'sveltekit-superforms/adapters';

const totpUpdateBucket = new RefillingTokenBucket<number>(3, 60 * 10);

export async function load(event: RequestEvent) {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, '/auth/login');
	}
	if (!event.locals.user.emailVerified) {
		return redirect(302, '/auth/verify-email');
	}
	if (event.locals.user.registered2FA && !event.locals.session.twoFactorVerified) {
		return redirect(302, '/auth/2fa');
	}

	// Générer la clé TOTP et le QR code
	const totpKey = new Uint8Array(20);
	crypto.getRandomValues(totpKey);
	const encodedTOTPKey = encodeBase64(totpKey);
	const keyURI = createTOTPKeyURI('Demo', event.locals.user.username, totpKey, 30, 6);

	// Générer le QR code
	const qrcode = renderSVG(keyURI);

	// Valider le formulaire avec Superform
	const totpForm = await superValidate(event, zod(totpSchema));

	return {
		encodedTOTPKey,
		qrcode,
		totpForm
	};
}

export const actions: Actions = {
	setuptotp: async (event: RequestEvent) => {
		if (event.locals.session === null || event.locals.user === null) {
			return fail(401, { message: 'Not authenticated' });
		}
		if (!event.locals.user.emailVerified) {
			return fail(403, { message: 'Email not verified' });
		}
		if (event.locals.user.registered2FA && !event.locals.session.twoFactorVerified) {
			return fail(403, { message: 'Two-factor already set up' });
		}
		if (!totpUpdateBucket.check(event.locals.user.id, 1)) {
			return fail(429, { message: 'Too many requests' });
		}

		// Valider le formulaire avec Superform
		const form = await superValidate(event, zod(totpSchema));

		if (!form.valid) {
			return fail(400, { message: 'Form validation failed', form });
		}

		const { encodedTOTPKey, code } = form.data;

		if (encodedTOTPKey.length !== 28) {
			return fail(400, { message: 'Invalid encoded key length', form });
		}

		let key: Uint8Array;
		try {
			key = decodeBase64(encodedTOTPKey);
		} catch (error) {
			console.error('Erreur lors du décodage de la clé :', error);
			return fail(400, { message: 'Invalid encoded key format', form });
		}

		if (key.byteLength !== 20) {
			return fail(400, { message: 'Invalid key length', form });
		}

		console.log('Vérification TOTP avec les paramètres suivants :', {
			key,
			code
		});

		console.log('Type de `code`:', typeof code);

		try {
			const isValid = verifyTOTP(key, 30, 6, code);

			if (!isValid) {
				return fail(400, { message: 'Invalid TOTP code', form });
			}
			console.log('Vérification TOTP réussie.');
		} catch (error) {
			return fail(500, { message: 'Internal server error', form });
		}

		await updateUserTOTPKey(event.locals.session.userId, key);
		await setSessionAs2FAVerified(event.locals.session.id);

		// Utilisez `throw redirect` pour rediriger correctement
		throw redirect(302, '/auth/recovery-code');
	}
};
