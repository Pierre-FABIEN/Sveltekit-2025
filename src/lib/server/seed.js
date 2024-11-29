import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
	console.log('Début du peuplement de la base de données...');

	try {
		// Supprimer les données existantes
		await prisma.$transaction([
			prisma.product.deleteMany(),
			prisma.agence.deleteMany(),
			prisma.director.deleteMany(),
			prisma.user.deleteMany(),
			prisma.chat.deleteMany()
		]);
		console.log('Toutes les données existantes ont été supprimées.');

		// Création des directeurs
		const directors = await Promise.all(
			Array.from({ length: 5 }).map(() =>
				prisma.director.create({
					data: {
						name: faker.person.fullName(),
						email: faker.internet.email(),
						age: faker.number.int({ min: 30, max: 60 }),
						isActive: faker.datatype.boolean()
					}
				})
			)
		);
		console.log(`${directors.length} directeurs créés.`);

		// Création des agences
		const agencies = await Promise.all(
			directors.map((director) =>
				prisma.agence.create({
					data: {
						street: faker.location.streetAddress(),
						city: faker.location.city(),
						state: faker.location.state(),
						zip: faker.location.zipCode(),
						country: faker.location.country(),
						directorId: director.id
					}
				})
			)
		);
		console.log(`${agencies.length} agences créées.`);

		// Création des produits
		const products = await Promise.all(
			agencies.map((agency) =>
				prisma.product.create({
					data: {
						name: faker.commerce.productName(),
						stock: faker.number.int({ min: 10, max: 500 }),
						price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
						agenceId: agency.id
					}
				})
			)
		);
		console.log(`${products.length} produits créés.`);

		// Création des utilisateurs
		const users = await Promise.all(
			Array.from({ length: 10 }).map(() =>
				prisma.user.create({
					data: {
						email: faker.internet.email(),
						username: faker.internet.userName(),
						passwordHash: faker.internet.password(),
						name: faker.person.fullName(),
						picture: faker.image.avatar(),
						emailVerified: faker.datatype.boolean()
					}
				})
			)
		);
		console.log(`${users.length} utilisateurs créés.`);

		// Création des chats
		const chats = await Promise.all(
			Array.from({ length: 3 }).map(() =>
				prisma.chat.create({
					data: {
						client_id: faker.string.uuid(),
						color: faker.color.rgb(),
						message: faker.lorem.sentence(),
						avatar: faker.image.avatar()
					}
				})
			)
		);
		console.log(`${chats.length} chats créés.`);

		// Afficher le résumé
		const counts = {
			directors: await prisma.director.count(),
			agencies: await prisma.agence.count(),
			products: await prisma.product.count(),
			users: await prisma.user.count(),
			chats: await prisma.chat.count()
		};

		console.log('--- Résumé des enregistrements ---');
		console.log(`Directeurs : ${counts.directors}`);
		console.log(`Agences : ${counts.agencies}`);
		console.log(`Produits : ${counts.products}`);
		console.log(`Utilisateurs : ${counts.users}`);
		console.log(`Chats : ${counts.chats}`);
		console.log(
			`Total des enregistrements : ${
				counts.directors + counts.agencies + counts.products + counts.users + counts.chats
			}`
		);
		console.log('Peuplement terminé avec succès !');
	} catch (error) {
		console.error('Erreur lors du peuplement :', error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
