import { prisma } from '$lib/server';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { RequestEvent } from '@sveltejs/kit';
import type { User } from './user';

export interface SessionFlags {
	twoFactorVerified: boolean;
}

export interface Session extends SessionFlags {
	id: string;
	expiresAt: Date;
	userId: number;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	return encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase();
}

export async function createSession(
	token: string,
	userId: number,
	flags: SessionFlags
): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Expiration dans 30 jours

	const session = await prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt,
			twoFactorVerified: flags.twoFactorVerified
		}
	});
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true }
	});

	// Si la session n'existe pas, retourne null sans essayer de la supprimer
	if (!result) {
		return { session: null, user: null };
	}

	// Si la session a expiré, la supprimer
	if (Date.now() >= result.expiresAt.getTime()) {
		try {
			await prisma.session.delete({ where: { id: sessionId } });
		} catch (error) {
			console.warn(`Erreur lors de la suppression de la session : ${error.message}`);
		}
		return { session: null, user: null };
	}

	// Prolonger la session si elle est proche de l'expiration
	if (Date.now() >= result.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await prisma.session.update({
			where: { id: sessionId },
			data: { expiresAt: newExpiresAt }
		});
		result.expiresAt = newExpiresAt;
	}

	const session: Session = {
		id: result.id,
		userId: result.userId,
		expiresAt: result.expiresAt,
		twoFactorVerified: result.twoFactorVerified
	};
	const user: User = {
		id: result.user.id,
		email: result.user.email,
		username: result.user.username,
		emailVerified: result.user.emailVerified,
		registered2FA: result.user.totpKey !== null
	};

	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateUserSessions(userId: number): Promise<void> {
	await prisma.session.deleteMany({ where: { userId } });
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}

export async function setSessionAs2FAVerified(sessionId: string): Promise<void> {
	await prisma.session.update({
		where: { id: sessionId },
		data: { twoFactorVerified: true }
	});
}
