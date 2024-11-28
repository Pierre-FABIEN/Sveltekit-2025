import { chatSchema } from '$lib/schema/chat/chatSchema';
import { prisma } from '$lib/server';
import type { Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(chatSchema));
	const messages = await prisma.chat.findMany();
	return { form, messages };
};
export const actions: Actions = {
	sendMessage: async ({ request, locals }) => {
		// Validation avec superValidate
		const form = await superValidate(request, zod(chatSchema));

		if (!form.valid) {
			return { form };
		}

		// Vérification de la disponibilité du WebSocket
		if (!locals.wss) {
			return fail(500, { error: 'WebSocket server is not available' });
		}

		let dataSend = {
			message: '',
			client_id: '',
			color: '',
			avatar: ''
		}; // Initialisation pour stocker les données à envoyer

		let clientId = null; // Initialisation pour le client WebSocket
		let color = null; // Initialisation pour la couleur générée
		let avatar = null; // Initialisation pour l'avatar généré

		// Diffuser le message via WebSocket
		locals.wss.clients.forEach((client) => {
			// Vérifier si le client est connecté et prêt
			if (client.readyState === 1) {
				// Récupérer ou générer les informations du client
				clientId = client.socketId;
				color = generateColor(clientId);
				avatar = generateAvatar(clientId);

				// Préparer les données à envoyer
				const payload = {
					client_id: clientId,
					message: form.data.message,
					color,
					avatar,
					createdAt: new Date().toISOString()
				};

				// Envoyer le message au client
				client.send(JSON.stringify(payload));

				// Sauvegarder les données pour la base de données
				dataSend = payload;
			}
		});

		// Vérifier si les données à envoyer ont été générées
		if (!dataSend) {
			return fail(500, { error: 'No active WebSocket clients to send the message' });
		}

		// Créer le message dans la base de données
		await prisma.chat.create({
			data: {
				message: dataSend.message,
				client_id: dataSend.client_id,
				color: dataSend.color,
				avatar: dataSend.avatar
			}
		});

		// Retourner un message de succès
		message(form, 'Message sent successfully');
	}
};

// Génération de couleur à partir d'une chaîne
const generateColor = (clientId: string): string => {
	let hash = 0;
	for (let i = 0; i < clientId.length; i++) {
		hash = clientId.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	for (let i = 0; i < 3; i++) {
		// Limiter les composantes RGB pour générer une couleur sombre
		const value = (hash >> (i * 8)) & 0xff;
		const darkValue = Math.floor(value / 2); // Réduire la valeur pour rester dans une plage sombre
		color += ('00' + darkValue.toString(16)).slice(-2);
	}
	return color;
};

// Génération d'URL d'avatar
const generateAvatar = (clientId: string): string => {
	return `https://robohash.org/${encodeURIComponent(clientId)}?size=50x50`;
};
