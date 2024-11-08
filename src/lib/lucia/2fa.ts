import { prisma } from '$lib/server';
import { decryptToString, encryptString } from './encryption';
import { ExpiringTokenBucket } from './rate-limit';
import { generateRandomRecoveryCode } from './utils';

export const totpBucket = new ExpiringTokenBucket<number>(5, 60 * 30); // Limite de 5 demandes toutes les 30 minutes
export const recoveryCodeBucket = new ExpiringTokenBucket<number>(3, 60 * 60); // Limite de 3 demandes toutes les 60 minutes

// Réinitialise l'authentification 2FA de l'utilisateur avec le code de récupération
export async function resetUser2FAWithRecoveryCode(
	userId: number,
	recoveryCode: string
): Promise<boolean> {
	// Récupère le code de récupération chiffré depuis la base de données
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { recoveryCode: true }
	});

	if (!user || !user.recoveryCode) {
		return false;
	}

	// Déchiffre le code de récupération
	const userRecoveryCode = decryptToString(user.recoveryCode);
	if (recoveryCode !== userRecoveryCode) {
		return false;
	}

	// Génère un nouveau code de récupération chiffré
	const newRecoveryCode = generateRandomRecoveryCode();
	const encryptedNewRecoveryCode = encryptString(newRecoveryCode);

	// Réinitialise la 2FA et met à jour le code de récupération dans une transaction
	const result = await prisma.$transaction([
		prisma.session.updateMany({
			where: { userId },
			data: { twoFactorVerified: false }
		}),
		prisma.user.updateMany({
			where: {
				id: userId,
				recoveryCode: user.recoveryCode // Vérifie que le code de récupération n'a pas changé
			},
			data: {
				recoveryCode: encryptedNewRecoveryCode,
				totpKey: null
			}
		})
	]);

	// Vérifie si la mise à jour a réussi
	return result[1].count > 0;
}
