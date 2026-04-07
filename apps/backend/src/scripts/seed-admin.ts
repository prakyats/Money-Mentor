import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const fullName = process.env.ADMIN_FULL_NAME?.trim() || 'Platform Admin';
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required for admin seed');
  }

  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        fullName,
        role: 'ADMIN',
        passwordHash,
      },
    });

    console.log(`Admin user updated: ${email}`);
    return;
  }

  await prisma.user.create({
    data: {
      email,
      fullName,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`Admin user created: ${email}`);
}

seedAdmin()
  .catch((error) => {
    console.error('Admin seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
