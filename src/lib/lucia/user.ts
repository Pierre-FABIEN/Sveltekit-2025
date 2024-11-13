import { prisma } from '$lib/server';
import { hashPassword } from './password';
import { decrypt, decryptToString, encrypt, encryptString } from './encryption';
import { generateRandomRecoveryCode } from './utils';

// Interface utilisateur unifiée
export interface User {
	id: number;
	email: string;
	username: string | null;
	emailVerified: boolean;
	registered2FA: boolean;
	googleId?: string;
	name?: string;
	picture?: string;
}

// Crée un nouvel utilisateur avec email et mot de passe + 2FA
export async function createUser(email: string, username: string, password: string): Promise<User> {
	const passwordHash = await hashPassword(password);
	const recoveryCode = generateRandomRecoveryCode();
	const encryptedRecoveryCode = encryptString(recoveryCode);
	const encryptedRecoveryCodeString = Buffer.from(encryptedRecoveryCode).toString('base64');

	const user = await prisma.user.create({
		data: {
			email,
			username,
			passwordHash,
			recoveryCode: encryptedRecoveryCodeString,
			emailVerified: false,
			totpKey: null
		}
	});
	return { ...user, registered2FA: user.totpKey !== null };
}

// Crée un nouvel utilisateur via Google OAuth
// Crée un nouvel utilisateur via Google OAuth
export async function createUserOAuth(
	googleId: string,
	email: string,
	name: string,
	picture: string
): Promise<User> {
	const user = await prisma.user.create({
		data: {
			googleId,
			email,
			username: name,
			name,
			picture,
			emailVerified: true,
			passwordHash: null,
			totpKey: null
		}
	});
	// Indique que l'utilisateur OAuth n'utilise pas la 2FA
	return { ...user, registered2FA: false };
}

// Récupère un utilisateur par email
export async function getUserFromEmail(email: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
			username: true,
			emailVerified: true,
			totpKey: true,
			googleId: true,
			name: true,
			picture: true
		}
	});
	return user ? { ...user, registered2FA: user.totpKey !== null } : null;
}

// Récupère un utilisateur par Google ID
export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { googleId },
		select: {
			id: true,
			email: true,
			username: true,
			emailVerified: true,
			totpKey: true,
			googleId: true,
			name: true,
			picture: true
		}
	});
	return user ? { ...user, registered2FA: false } : null;
}

// Fonctions de gestion utilisateur (mot de passe, récupération, etc.)
export async function updateUserPassword(userId: number, password: string): Promise<void> {
	const passwordHash = await hashPassword(password);
	await prisma.user.update({
		where: { id: userId },
		data: { passwordHash }
	});
}

export async function updateUserEmailAndSetEmailAsVerified(
	userId: number,
	email: string
): Promise<void> {
	await prisma.user.update({
		where: { id: userId },
		data: { email, emailVerified: true }
	});
}

export async function setUserAsEmailVerifiedIfEmailMatches(
	userId: number,
	email: string
): Promise<boolean> {
	const result = await prisma.user.updateMany({
		where: { id: userId, email },
		data: { emailVerified: true }
	});
	return result.count > 0;
}

export async function getUserPasswordHash(userId?: number, email?: string): Promise<string | null> {
	if (!userId && !email) throw new Error('Missing user identifier: userId or email is required.');
	const whereClause = userId ? { id: userId } : { email };
	const user = await prisma.user.findUnique({
		where: whereClause,
		select: { passwordHash: true }
	});
	if (!user) throw new Error('User not found.');
	return user.passwordHash;
}

export async function getUserRecoverCode(userId: number): Promise<string> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { recoveryCode: true, googleId: true }
	});
	if (!user || user.googleId || !user.recoveryCode) {
		throw new Error('Recovery code not available for this user.');
	}
	return decryptToString(user.recoveryCode);
}

export async function getUserTOTPKey(userId: number): Promise<Uint8Array | null> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { totpKey: true }
	});
	return user && user.totpKey ? decrypt(user.totpKey) : null;
}

export async function updateUserTOTPKey(userId: number, key: Uint8Array): Promise<void> {
	const encryptedKey = encrypt(key);
	await prisma.user.update({
		where: { id: userId },
		data: { totpKey: encryptedKey }
	});
}

export async function resetUserRecoveryCode(userId: number): Promise<string> {
	const recoveryCode = generateRandomRecoveryCode();
	const encryptedCode = encryptString(recoveryCode);
	await prisma.user.update({
		where: { id: userId },
		data: { recoveryCode: encryptedCode }
	});
	return recoveryCode;
}

// Gestion des sessions OAuth pour Google
export async function handleGoogleOAuth(
	googleId: string,
	email: string,
	name: string,
	picture: string
): Promise<User> {
	let user = await getUserFromGoogleId(googleId);
	if (!user) {
		user = await createUserOAuth(googleId, email, name, picture);
	}
	// Indique que l'utilisateur OAuth n'utilise pas la 2FA
	user.registered2FA = false;
	return user;
}
