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
			avatar: '',
			createdAt: ''
		};

		console.log(form);

		// Diffuser le message via WebSocket
		locals.wss.clients.forEach((client) => {
			// Vérifier si le client est connecté et prêt
			if (client.readyState === 1) {
				// Récupérer ou générer les informations du client
				const senderId = form.data.client_id;

				// Préparer les données à envoyer
				dataSend = {
					client_id: senderId,
					message: form.data.message,
					color: form.data.color,
					avatar: form.data.avatar,
					createdAt: new Date().toISOString()
				};

				// Envoyer le message au client
				client.send(JSON.stringify({ type: 'Chat', value: dataSend }));
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
				avatar: dataSend.avatar,
				createdAt: dataSend.createdAt
			}
		});

		// Retourner un message de succès
		message(form, 'Message sent successfully');
	}
};
