import { PrismaClient } from '@prisma/client';

declare const global: any;

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;