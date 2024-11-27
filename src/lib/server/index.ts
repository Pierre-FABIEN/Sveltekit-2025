import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { PUBLIC_PORT } from '$env/static/public';
const prisma = new PrismaClient();
const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

// Gestion des connexions Socket.io
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

// Singleton pour l'instance Socket.io
let ioInstance: Server | null = null;

export function getIoInstance() {
	if (!ioInstance) {
		ioInstance = io;
	}
	return ioInstance;
}

if (!ioInstance) {
	httpServer.listen(PUBLIC_PORT, () => {
		console.log(`Socket.io Server est actif sur http://localhost:${PUBLIC_PORT}`);
	});
}

// Assurer une fermeture propre de Prisma
process.on('SIGINT', async () => {
	await prisma.$disconnect();
	process.exit(0);
});

export { prisma };
