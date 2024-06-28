
# Backend API Development

This README provides detailed instructions on how to set up, run, and use the backend API developed using Node.js with Nest.js, Prisma, and PostgreSQL.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Database Setup](#database-setup)
3. [Prisma Setup](#prisma-setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Seeding Data](#seeding-data)
7. [Authentication](#authentication)

## Project Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create an `.env` file:**
   Create a `.env` file in the root directory and add the following environment variables:
   ```sh
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   ```

## Database Setup

1. **Install PostgreSQL:**
   Ensure you have PostgreSQL installed on your machine. You can download it from the [official website](https://www.postgresql.org/download/).

2. **Create a new PostgreSQL database:**
   ```sh
   psql -U postgres
   CREATE DATABASE database_name;
   ```

## Prisma Setup

1. **Initialize Prisma:**
   ```sh
   npx prisma init
   ```

2. **Update Prisma schema:**
   Update the `prisma/schema.prisma` file with your database schema. For example:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id       Int      @id @default(autoincrement())
     email    String   @unique
     password String
     name     String?
   }

   model Invoice {
     id          Int      @id @default(autoincrement())
     vendor_name String
     amount      Float
     due_date    DateTime
     description String?
     user_id     Int
     paid        Boolean
     user        User     @relation(fields: [user_id], references: [id])
   }
   ```

3. **Generate Prisma client:**
   ```sh
   npx prisma generate
   ```

## Running the Application

1. **Run database migrations:**
   ```sh
   npx prisma migrate dev --name init
   ```

2. **Start the development server:**
   ```sh
   npm run start:dev
   ```

## API Endpoints

- **POST /auth/login:** Authenticate a user and return an authentication token.
- **GET /invoices:** Retrieve all invoices.
- **GET /invoices?page=1&limit=10:** Retrieve for each page.
- **GET /invoices/:id:** Retrieve details of a specific invoice.
- **GET /invoices/total:** Retrieve a data aggregation of the total amount due by due_date.

## Seeding Data

1. **Create a seed script:**
   Create a `prisma/seed.ts` file with the following content:
   ```typescript
   import { PrismaClient } from '@prisma/client';
   const prisma = new PrismaClient();

   async function main() {
     const user = await prisma.user.create({
       data: {
         email: 'user@example.com',
         password: 'password',
         name: 'John Doe',
       },
     });

     await prisma.invoice.createMany({
       data: [
         {
           vendor_name: 'Vendor 1',
           amount: 100,
           due_date: new Date(),
           description: 'Invoice 1',
           user_id: user.id,
           paid: false,
         },
         {
           vendor_name: 'Vendor 2',
           amount: 200,
           due_date: new Date(),
           description: 'Invoice 2',
           user_id: user.id,
           paid: true,
         },
       ],
     });
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

2. **Run the seed script:**
   ```sh
   npx ts-node prisma/seed.ts
   ```

## Authentication

- **Login credentials:** Use the username and password to log in.

---

For any questions or issues, please contact us at ruodongsde@gmail.com.
