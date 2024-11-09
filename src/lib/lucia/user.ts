import { prisma } from '$lib/server';
import { hashPassword } from './password';
import { decrypt, decryptToString, encrypt, encryptString } from './encryption';
import { generateRandomRecoveryCode } from './utils';

export interface User {
	id: number;
	email: string;
	username: string;
	emailVerified: boolean;
	registered2FA: boolean;
}

// Crée un nouvel utilisateur avec un code de récupération chiffré
export async function createUser(email: string, username: string, password: string) {
	const passwordHash = await hashPassword(password);
	const recoveryCode = generateRandomRecoveryCode();
	const encryptedRecoveryCode = encryptString(recoveryCode);

	// Convertir le Uint8Array en base64
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

	return user;
}

// Met à jour le mot de passe de l'utilisateur
export async function updateUserPassword(userId: number, password: string): Promise<void> {
	const passwordHash = await hashPassword(password);
	await prisma.user.update({
		where: { id: userId },
		data: { passwordHash }
	});
}

// Met à jour l'email de l'utilisateur et le marque comme vérifié
export async function updateUserEmailAndSetEmailAsVerified(
	userId: number,
	email: string
): Promise<void> {
	await prisma.user.update({
		where: { id: userId },
		data: { email, emailVerified: true }
	});
}

// Marque l'email de l'utilisateur comme vérifié si l'email correspond
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

// Récupère le hash du mot de passe de l'utilisateur
export async function getUserPasswordHash(userId: number): Promise<string> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { passwordHash: true }
	});
	if (!user) {
		throw new Error('Invalid user ID');
	}
	return user.passwordHash;
}

// Récupère le code de récupération de l'utilisateur (décrypté)
export async function getUserRecoverCode(userId: number): Promise<string> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { recoveryCode: true }
	});
	if (!user || !user.recoveryCode) {
		throw new Error('Invalid user ID');
	}
	return decryptToString(user.recoveryCode);
}

// Récupère la clé TOTP de l'utilisateur (décryptée)
export async function getUserTOTPKey(userId: number): Promise<Uint8Array | null> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { totpKey: true }
	});
	if (!user || !user.totpKey) {
		return null;
	}
	return decrypt(user.totpKey);
}

// Met à jour la clé TOTP de l'utilisateur
export async function updateUserTOTPKey(userId: number, key: Uint8Array): Promise<void> {
	const encryptedKey = encrypt(key);
	await prisma.user.update({
		where: { id: userId },
		data: { totpKey: encryptedKey }
	});
}

// Réinitialise le code de récupération de l'utilisateur
export async function resetUserRecoveryCode(userId: number): Promise<string> {
	const recoveryCode = generateRandomRecoveryCode();
	const encryptedCode = encryptString(recoveryCode);
	await prisma.user.update({
		where: { id: userId },
		data: { recoveryCode: encryptedCode }
	});
	return recoveryCode;
}

// Récupère l'utilisateur à partir de l'email
export async function getUserFromEmail(email: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
			username: true,
			emailVerified: true,
			totpKey: true
		}
	});
	if (!user) {
		return null;
	}
	return {
		id: user.id,
		email: user.email,
		username: user.username,
		emailVerified: user.emailVerified,
		registered2FA: user.totpKey !== null
	};
}
