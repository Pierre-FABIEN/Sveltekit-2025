import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
	console.log('Début du peuplement de la base de données avec des données fictives...');

	try {
		// Suppression de toutes les données existantes
		await prisma.product.deleteMany();
		await prisma.agence.deleteMany();
		await prisma.director.deleteMany();
		await prisma.user.deleteMany();
		await prisma.chat.deleteMany();

		console.log('Toutes les données existantes ont été supprimées.');

		// Création des directeurs fictifs
		const directors = [];
		for (let i = 0; i < 5; i++) {
			directors.push(
				await prisma.director.create({
					data: {
						name: faker.person.fullName(),
						email: faker.internet.email(),
						age: faker.number.int({ min: 30, max: 60 }),
						isActive: faker.datatype.boolean()
					}
				})
			);
		}
		console.log(`${directors.length} directeurs créés.`);

		// Création des agences fictives
		const agencies = [];
		for (const director of directors) {
			for (let i = 0; i < 1; i++) {
				// Réduction à 1 agence par directeur
				agencies.push(
					await prisma.agence.create({
						data: {
							street: faker.location.streetAddress(),
							city: faker.location.city(),
							state: faker.location.state(),
							zip: faker.location.zipCode(),
							country: faker.location.country(),
							directorId: director.id
						}
					})
				);
			}
		}
		console.log(`${agencies.length} agences créées.`);

		// Création des produits fictifs
		const products = [];
		for (const agency of agencies) {
			for (let i = 0; i < 1; i++) {
				// Réduction à 1 produit par agence
				products.push(
					await prisma.product.create({
						data: {
							name: faker.commerce.productName(),
							stock: faker.number.int({ min: 10, max: 500 }),
							price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
							agenceId: agency.id
						}
					})
				);
			}
		}
		console.log(`${products.length} produits créés.`);

		// Création des utilisateurs fictifs
		const users = [];
		for (let i = 0; i < 10; i++) {
			users.push(
				await prisma.user.create({
					data: {
						email: faker.internet.email(),
						username: faker.internet.userName(),
						passwordHash: faker.internet.password(),
						name: faker.person.fullName(),
						picture: faker.image.avatar(),
						emailVerified: faker.datatype.boolean()
					}
				})
			);
		}
		console.log(`${users.length} utilisateurs créés.`);

		// Création des chats fictifs
		const chats = [];
		for (let i = 0; i < 3; i++) {
			chats.push(
				await prisma.chat.create({
					data: {
						client_id: faker.string.uuid(),
						color: faker.color.rgb(),
						message: faker.lorem.sentence(),
						avatar: faker.image.avatar()
					}
				})
			);
		}
		console.log(`${chats.length} chats créés.`);

		// Compter le total des enregistrements
		const totalDirectors = await prisma.director.count();
		const totalAgencies = await prisma.agence.count();
		const totalProducts = await prisma.product.count();
		const totalUsers = await prisma.user.count();
		const totalChats = await prisma.chat.count();
		const totalRecords =
			totalDirectors + totalAgencies + totalProducts + totalUsers + totalChats;

		console.log('--- Résumé ---');
		console.log(`Directeurs : ${totalDirectors}`);
		console.log(`Agences : ${totalAgencies}`);
		console.log(`Produits : ${totalProducts}`);
		console.log(`Utilisateurs : ${totalUsers}`);
		console.log(`Chats : ${totalChats}`);
		console.log(`Total des enregistrements : ${totalRecords}`);
		console.log('Peuplement terminé avec succès !');
	} catch (error) {
		console.error('Erreur lors du peuplement :', error);
	} finally {
		await prisma.$disconnect();
	}
}

main();
