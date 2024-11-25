import { PrismaClient } from '@prisma/client';
import { SocioServer } from 'socio/dist/core-server.js';
import type { SocioSession } from 'socio/dist/core-session.js';

import { perMessageDeflate } from 'socio/dist/utils.js';

// Initialisation de Prisma
export const prisma = new PrismaClient();
export let socio: SocioServer;

// Fonction d'initialisation pour SocioServer
export async function initializeSocioServer() {
	const dbInterface = await SetUpDBInterface();

	if (!socio) {
		// Création du SocioServer
		socio = new SocioServer(
			{
				port: 5000,
				perMessageDeflate
			},
			{
				db: dbInterface,
				logging: { verbose: true, hard_crash: false },
				send_sensitive_error_msgs_to_client: false // Désactiver en production
			}
		);
	}

	socio.raw_websocket_server.on('error', (err) => {
		console.error('WebSocket Error:', err);
	});

	// Ajouter un événement pour surveiller les connexions/déconnexions
	socio.raw_websocket_server.on('connection', (socket) => {
		console.log('New connection established');
		socket.on('close', () => console.log('Connection closed'));
	});

	console.log('SocioServer initialisé sur le port 5000');
	return socio;
}

// Fonction pour configurer l'interface DB
async function SetUpDBInterface() {
	return {
		Query: async (client: SocioSession, id: any, sql: string, params?: any): Promise<object> => {
			try {
				// Utilisation de Prisma pour exécuter des requêtes brutes en toute sécurité
				const result = await prisma.$queryRawUnsafe(sql, ...(params ? Object.values(params) : []));
				return result as object; // Cast explicite pour correspondre au type attendu
			} catch (error) {
				console.error('Erreur dans la requête SQL:', error);
				throw error;
			}
		}
	};
}

// Initialisation lors du démarrage
initializeSocioServer().catch((err) => {
	console.error("Erreur lors de l'initialisation de SocioServer:", err);
});
