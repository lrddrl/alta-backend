import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Users data
  const users = [
    { email: 'user1@example.com', password: '}KOGpN]w81P6', username: 'john' },
    { email: 'user2@example.com', password: 'F0v;_Fon*2P7', username: 'tom' },
  ];

  // Create users individually
  for (const user of users) {
    try {
      await prisma.user.create({
        data: user,
      });
      console.log(`Created user: ${user.username}`);
    } catch (e) {
      console.error(`Error creating user: ${user.username}`, e);
    }
  }

  // Fetch created users
  const createdUsers = await prisma.user.findMany();
  console.log('Created Users:', createdUsers);

  // Create invoices
  const invoices = [];
  for (let i = 0; i < 50; i++) {
    invoices.push({
      vendor_name: `Vendor ${i + 1}`,
      amount: Math.random() * 1000,
      due_date: new Date(2024, i % 12, (i % 28) + 1),
      description: `Invoice ${i + 1} description`,
      user_id: createdUsers[i % createdUsers.length].id,
      paid: Math.random() < 0.5,
    });
  }

  try {
    await prisma.invoice.createMany({
      data: invoices,
    });
    console.log('Created invoices');
  } catch (e) {
    console.error('Error creating invoices', e);
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
