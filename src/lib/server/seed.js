import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Début du peuplement de la base de données...');

	// Création des directeurs
	const directors = await prisma.$transaction([
		prisma.director.create({
			data: {
				name: 'Alice Johnson',
				email: 'alice.johnson@example.com',
				age: 50
			}
		}),
		prisma.director.create({
			data: {
				name: 'Bob Williams',
				email: 'bob.williams@example.com',
				age: 42
			}
		}),
		prisma.director.create({
			data: {
				name: 'Catherine Brown',
				email: 'catherine.brown@example.com',
				age: 37
			}
		}),
		prisma.director.create({
			data: {
				name: 'David Miller',
				email: 'david.miller@example.com',
				age: 55
			}
		})
	]);

	// Création des agences
	const agencies = await prisma.$transaction([
		prisma.agence.create({
			data: {
				street: '10 Downing St',
				city: 'London',
				state: 'London',
				zip: 'SW1A 2AA',
				country: 'UK',
				directorId: directors[0].id
			}
		}),
		prisma.agence.create({
			data: {
				street: '1600 Pennsylvania Ave',
				city: 'Washington',
				state: 'DC',
				zip: '20500',
				country: 'USA',
				directorId: directors[1].id
			}
		}),
		prisma.agence.create({
			data: {
				street: 'Champs-Élysées',
				city: 'Paris',
				state: 'Île-de-France',
				zip: '75008',
				country: 'France',
				directorId: directors[2].id
			}
		}),
		prisma.agence.create({
			data: {
				street: 'Piazza del Colosseo',
				city: 'Rome',
				state: 'Lazio',
				zip: '00184',
				country: 'Italy',
				directorId: directors[3].id
			}
		}),
		prisma.agence.create({
			data: {
				street: 'Shibuya Crossing',
				city: 'Tokyo',
				state: 'Tokyo',
				zip: '150-0002',
				country: 'Japan',
				directorId: directors[0].id
			}
		})
	]);

	// Création des produits
	const products = await prisma.$transaction([
		prisma.product.create({
			data: {
				name: 'Laptop X200',
				stock: 150,
				price: 999.99,
				agenceId: agencies[0].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Smartphone Pro',
				stock: 200,
				price: 799.99,
				agenceId: agencies[1].id
			}
		}),
		prisma.product.create({
			data: {
				name: '4K TV',
				stock: 50,
				price: 1200.0,
				agenceId: agencies[2].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Gaming Console',
				stock: 100,
				price: 499.99,
				agenceId: agencies[3].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Wireless Earbuds',
				stock: 500,
				price: 199.99,
				agenceId: agencies[4].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Smartwatch',
				stock: 300,
				price: 299.99,
				agenceId: agencies[0].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Digital Camera',
				stock: 75,
				price: 899.99,
				agenceId: agencies[1].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Bluetooth Speaker',
				stock: 250,
				price: 149.99,
				agenceId: agencies[2].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'E-Reader',
				stock: 120,
				price: 129.99,
				agenceId: agencies[3].id
			}
		}),
		prisma.product.create({
			data: {
				name: 'Tablet',
				stock: 180,
				price: 399.99,
				agenceId: agencies[4].id
			}
		})
	]);

	console.log('Peuplement terminé avec succès !');
	console.log(
		`Créé : ${directors.length} directeurs, ${agencies.length} agences, et ${products.length} produits.`
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
