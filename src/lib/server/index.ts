import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: '*', // Changez '*' pour des domaines spécifiques en production
		methods: ['GET', 'POST']
	}
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
	console.log('Nouvelle connexion :', socket.id);

	socket.on('participant', async (data) => {
		try {
			const { client_id, color, message, avatar } = data;

			if (!client_id || !message) {
				console.error('Données invalides reçues :', data);
				return;
			}

			const participant = await prisma.participant.create({
				data: { client_id, color, message, avatar }
			});

			io.emit('newParticipant', participant);
		} catch (error) {
			console.error('Erreur lors de la création du participant :', error);
		}
	});

	socket.on('disconnect', () => {
		console.log('Déconnexion :', socket.id);
	});
});

// Singleton pour l'instance Socket.io
let ioInstance: Server | null = null;

export function getIoInstance() {
	if (!ioInstance) {
		ioInstance = io;
	}
	return ioInstance;
}

// Lancer le serveur sur un port spécifique
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
	console.log(`Socket.io Server est actif sur http://localhost:${PORT}`);
});

// Assurer une fermeture propre de Prisma
process.on('SIGINT', async () => {
	await prisma.$disconnect();
	process.exit(0);
});

export { prisma };
