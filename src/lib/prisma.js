import { PrismaClient } from "@prisma/client";
import { PrismaMongoDB } from "@prisma/adapter-mongodb";
import { MongoClient } from "mongodb";

const globalForPrisma = globalThis;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const mongoClient = new MongoClient(process.env.DATABASE_URL);
const adapter = new PrismaMongoDB(mongoClient);

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
