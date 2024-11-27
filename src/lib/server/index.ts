import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000; // default port

// Check if the server is already initialized
if (!globalThis.ioInstance) {
  const httpServer = createServer();

  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Change to specific domains in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('chat', async (data) => {
      try {
        const { client_id, color, message, avatar } = data;

        if (!client_id || !message) {
          console.error('Invalid data received:', data);
          return;
        }

        const chat = await prisma.chat.create({
          data: { client_id, color, message, avatar },
        });

        io.emit('newChat', chat);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
    });
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  // Store the Socket.io instance globally
  globalThis.ioInstance = io;
}

// Export the Socket.io instance
export function getIoInstance() {
  return globalThis.ioInstance;
}

// Ensure proper shutdown of Prisma
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma disconnected gracefully.');
  process.exit(0);
});

export { prisma };
