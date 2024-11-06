import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function sampleData() {
	const users = await prisma.$transaction(async (txn) => {
		await txn.user.deleteMany();
		return await txn.user.createMany({
			data: [
				{
					name: 'Alice',
					email: 'alice@example.com',
					age: 25,
					createdAt: new Date('2023-01-15T10:00:00Z'),
					isActive: true
				},
				{
					name: 'Bob',
					email: 'bob@example.com',
					age: 30,
					createdAt: new Date('2023-02-20T15:30:00Z'),
					isActive: false
				},
				{
					name: 'Charlie',
					email: 'charlie@example.com',
					age: 22,
					createdAt: new Date('2023-03-10T08:45:00Z'),
					isActive: true
				},
				{
					name: 'Diana',
					email: 'diana@example.com',
					age: 28,
					createdAt: new Date('2023-04-05T11:20:00Z'),
					isActive: true
				}
			]
		});
	});

	console.log(`Created users: ${JSON.stringify(users)}`);
}

sampleData().finally(async () => {
	await prisma.$disconnect();
});
