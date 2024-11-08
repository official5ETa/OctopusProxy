import { Logger } from '@nestjs/common';
import { exec } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

export async function prismaGenerate(): Promise<void> {
  await promisify(exec)(`
      prisma generate --schema=${path.resolve(__dirname, '../prisma/schema.prisma')} || npx prisma generate --schema=${path.resolve(__dirname, '../prisma/schema.prisma')}
    `);
  Logger.log('Prisma generated', 'PrismaClient');
}

export async function prismaMigrate(databaseUrl: string): Promise<void> {
  process.env.PRISMA_DATABASE_URL = databaseUrl;
  await promisify(exec)(`
      prisma migrate deploy --schema=${path.resolve(__dirname, '../prisma/schema.prisma')} || npx prisma migrate deploy --schema=${path.resolve(__dirname, '../prisma/schema.prisma')}
    `);
  Logger.log('Prisma migrations deployed', 'PrismaClient');
}