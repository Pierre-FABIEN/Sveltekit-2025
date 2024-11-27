import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = parseInt(process.env.PORT || '3000', 10); // Utilise le port fourni ou 3000 par défaut

// Singleton pour éviter de démarrer plusieurs serveurs
let ioInstance: Server | null = null;

const httpServer = createServer();

if (!ioInstance) {
	// Initialise le serveur HTTP et Socket.io
	const io = new Server(httpServer, {
		cors: {
			origin: '*', // Modifiez '*' pour des domaines spécifiques en production
			methods: ['GET', 'POST']
		}
	});

	io.on('connection', (socket) => {
		console.log('Nouvelle connexion :', socket.id);

		socket.on('chat', async (data) => {
			try {
				const { client_id, color, message, avatar } = data;

				if (!client_id || !message) {
					console.error('Données invalides reçues :', data);
					return;
				}

				// Enregistre le chat dans la base de données
				const chat = await prisma.chat.create({
					data: { client_id, color, message, avatar }
				});

				// Diffuse le nouveau chat à tous les clients
				io.emit('newChat', chat);
			} catch (error) {
				console.error('Erreur lors de la création du chat :', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('Déconnexion :', socket.id);
		});
	});

	// Gestion des erreurs pour éviter un crash
	httpServer.on('error', (error: NodeJS.ErrnoException) => {
		if (error.code === 'EADDRINUSE') {
			console.error(`Le port ${PORT} est déjà utilisé. Veuillez vérifier les conflits.`);
			process.exit(1); // Terminez proprement le processus
		} else {
			console.error('Erreur serveur :', error);
		}
	});

	// Démarre le serveur HTTP
	httpServer.listen(PORT, '0.0.0.0', () => {
		console.log(`Serveur actif sur http://localhost:${PORT}`);
	});

	ioInstance = io; // Stocke l'instance de Socket.io
}

// Fonction pour récupérer l'instance Socket.io
export function getIoInstance(): Server {
	if (!ioInstance) {
		throw new Error("Socket.io n'a pas été initialisé.");
	}
	return ioInstance;
}

// Assurer une fermeture propre de Prisma
process.on('SIGINT', async () => {
	await prisma.$disconnect();
	console.log('Prisma déconnecté proprement.');
	process.exit(0);
});

export { prisma };
