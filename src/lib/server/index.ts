import { PrismaClient } from '@prisma/client';
import { SocioServer } from 'socio/dist/core-server.js';
import { SocioSecurity } from 'socio/dist/secure.js';
import { perMessageDeflate } from 'socio/dist/utils.js';

import { SECRET_SECURE_PRIVATE_KEY } from '$env/static/private';

export const prisma = new PrismaClient();

// SocioServer Configuration
export const socio = new SocioServer(
	{ port: 3000, perMessageDeflate }, // Options WebSocket
	{
		db: {
			Query: async (client, id, sql, params) => {
				// Exemple d'intégration avec Prisma
				if (sql.trim().startsWith('SELECT * FROM Participants')) {
					return await prisma.participant.findMany();
				} else if (sql.trim().startsWith('INSERT INTO Participants')) {
					const { name, num } = params;
					return await prisma.participant.create({ data: { name, num } });
				}
				return [];
			}
		},
		socio_security: new SocioSecurity({
			secure_private_key: SECRET_SECURE_PRIVATE_KEY,
			logging: { verbose: true }
		}),
		logging: { verbose: true, hard_crash: false }
	}
);

console.log('Initialisation des participants dans SocioServer');
socio.RegisterProp('participants', [], {
	assigner: (currentValue, newValue) => {
		if (Array.isArray(newValue)) {
			console.log('Mise à jour des participants :', newValue);
			return socio.SetPropVal('participants', newValue);
		}
		return false;
	}
});

// Charger les participants initiaux depuis la base de données
(async () => {
	const initialParticipants = await prisma.participant.findMany();
	console.log('Participants initiaux :', initialParticipants);
	await socio.SetPropVal('participants', initialParticipants);
})();
