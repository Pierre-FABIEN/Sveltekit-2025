import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// export const socio = new SocioServer(
// 	{ port: 3000, perMessageDeflate },
// 	{
// 		db: {
// 			Query: async (client, id, sql, params) => {
// 				if (sql.trim().startsWith('SELECT * FROM Participants')) {
// 					return await prisma.participant.findMany();
// 				} else if (sql.trim().startsWith('INSERT INTO Participants')) {
// 					const { name, num } = params;
// 					return await prisma.participant.create({ data: { name, num } });
// 				}
// 				return [];
// 			}
// 		},
// 		socio_security: new SocioSecurity({
// 			secure_private_key: process.env.SOCIO_PRIVATE_KEY || 'default_secure_key',
// 			logging: { verbose: true }
// 		}),
// 		logging: { verbose: true, hard_crash: false }
// 	}
// );

// // Ajout d'une méthode de diffusion
// socio.broadcast = function (channel: string, payload: any) {
// 	// Parcours de toutes les connexions WebSocket actives
// 	this.web_socket_server?.clients.forEach((client) => {
// 		if (client.readyState === WebSocket.OPEN) {
// 			client.send(JSON.stringify({ channel, payload }));
// 		}
// 	});
// };
