import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import net from 'net';

const prisma = new PrismaClient();
const PORT = parseInt(process.env.PORT || '3000', 10); // Par défaut, utilise 3000

// Vérifie si le port est déjà utilisé
function checkPort(port: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const tester = net
			.createServer()
			.once('error', (err: NodeJS.ErrnoException) => {
				if (err.code === 'EADDRINUSE') {
					resolve(false); // Le port est occupé
				} else {
					reject(err); // Autre erreur
				}
			})
			.once('listening', () => {
				tester.close(() => resolve(true)); // Le port est libre
			})
			.listen(port);
	});
}

// Singleton pour éviter plusieurs instances de serveur
let ioInstance: Server | null = null;

async function startServer() {
	const portAvailable = await checkPort(PORT);
	if (!portAvailable) {
		console.error(`Le port ${PORT} est déjà utilisé. Veuillez vérifier.`);
		process.exit(1); // Termine proprement le processus
	}

	const httpServer = createServer();

	if (!ioInstance) {
		const io = new Server(httpServer, {
			cors: {
				origin: '*', // Changez pour des domaines spécifiques en production
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

					const chat = await prisma.chat.create({
						data: { client_id, color, message, avatar }
					});

					io.emit('newChat', chat);
				} catch (error) {
					console.error('Erreur lors de la création du chat :', error);
				}
			});

			socket.on('disconnect', () => {
				console.log('Déconnexion :', socket.id);
			});
		});

		httpServer.listen(PORT, '0.0.0.0', () => {
			console.log(`Serveur actif sur http://localhost:${PORT}`);
		});

		ioInstance = io;
	}
}

// Expose l'instance Socket.io
export function getIoInstance(): Server {
	if (!ioInstance) {
		throw new Error("Socket.io n'a pas été initialisé.");
	}
	return ioInstance;
}

// Démarre le serveur
startServer().catch((err) => {
	console.error('Erreur au démarrage du serveur :', err);
	process.exit(1);
});

// Assure une fermeture propre de Prisma
process.on('SIGINT', async () => {
	await prisma.$disconnect();
	console.log('Prisma déconnecté proprement.');
	process.exit(0);
});

export { prisma };
