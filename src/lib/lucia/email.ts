import { prisma } from '$lib/server';

// Fonction pour vérifier si l'email a un format valide
export function verifyEmailInput(email: string): boolean {
	// Regex simple pour valider l'email
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}

// Fonction pour vérifier la disponibilité de l'email dans la base de données
export async function checkEmailAvailability(email: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { email },
		select: { id: true }
	});

	// Si aucun utilisateur n'est trouvé, l'email est disponible
	return user === null;
}
