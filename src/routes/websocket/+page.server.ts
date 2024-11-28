import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	// Action pour envoyer un message
	sendMessage: async ({ request, locals }) => {
		const formData = await request.formData();
		const message = formData.get('message')?.toString() || '';

		if (!locals.wss) {
			// Renvoi d'un échec si le serveur WebSocket n'est pas initialisé
			return fail(500, { error: 'WebSocket server is not available' });
		}

		// Envoi du message à tous les clients connectés
		locals.wss.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(message);
			}
		});

		// Retourner un objet sérialisable
		return {
			success: true,
			message: 'Message sent to WebSocket clients'
		};
	},

	// Action pour récupérer des données
	getData: async ({ locals }) => {
		if (!locals.wss) {
			return fail(500, { error: 'WebSocket server is not available' });
		}

		// Notifier tous les clients via WebSocket
		locals.wss.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(`Data retrieved from the server at ${new Date().toLocaleString()}`);
			}
		});

		// Retourner un objet sérialisable
		return {
			success: true,
			message: 'Data retrieved and sent to WebSocket clients'
		};
	}
};
