import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Buat adapter untuk SQLite
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
});

// Buat Prisma Client dengan adapter
const prisma = new PrismaClient({ adapter });

export default prisma;