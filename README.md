# alta-backend

NestJS + Prisma/PostgreSQL REST API for tracking invoices. JWT-protected routes for listing, paginating, and aggregating invoices by due date.

## Tech Stack

- **Framework**: NestJS 10
- **ORM**: Prisma 5
- **DB**: PostgreSQL
- **Auth**: `@nestjs/jwt` + `passport-jwt`, password hashing with `bcryptjs`
- **Validation**: Zod + `class-validator`
- **Container**: Dockerfile + docker-compose
- **Tests**: Jest (unit + supertest e2e)
- **Language**: TypeScript 5

## Architecture

Four feature modules: `PrismaModule` (DB client), `AuthModule` (JWT issue + guard), `InvoicesModule` (queries), and `MiddlewareModule`. The Prisma schema defines two models — `User` (with `invoices` relation) and `Invoice` (`vendor_name`, `amount`, `due_date`, `description`, `user_id`, `paid`).

## Endpoints (all behind `JwtAuthGuard`)

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET    | `/invoices`                 | List all invoices (optional `?page=&limit=` for pagination) |
| GET    | `/invoices/total?dueDate=`   | Total `amount` of invoices due on the given date |
| GET    | `/invoices/:id`             | Single invoice by id |

## Setup

```bash
git clone https://github.com/lrddrl/alta-backend.git
cd alta-backend
npm install

# 1. Create a .env file in the project root with:
#    DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/database_name?schema=public"
#    JWT_SECRET="your-jwt-secret"

# 2. Apply the schema
npx prisma migrate dev --name init

# 3. (Optional) seed using prisma/seed.ts
npx ts-node prisma/seed.ts

# 4. Run
npm run start:dev
```

Server starts on `http://localhost:3000`. To run the full stack with Postgres in Docker, use `docker-compose up`.
