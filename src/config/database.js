import { PrismaClient } from "@prisma/client";
// Buat Prisma Client dengan adapter
const prisma = new PrismaClient();

export default prisma;