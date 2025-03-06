// import { PrismaClient } from "@prisma/client";
// console.log(process.env.DATABASE_URL, 'front e back');

// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";
console.log(process.env.DATABASE_URL, 'front e back');

// Tipando explicitamente NODE_ENV
const nodeEnv = process.env.NODE_ENV as "development" | "production" | "test";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (nodeEnv !== "production") globalForPrisma.prisma = prisma;



