import { PrismaClient } from '@prisma/client';

declare const global: any;

export const prisma = global.prisma || new PrismaClient();

global.prisma = prisma;