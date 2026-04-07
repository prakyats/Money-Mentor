import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  createUser(data: { email: string; fullName: string; passwordHash: string }) {
    return this.prisma.user.create({ data });
  }

  updateRefreshTokenHash(userId: string, refreshTokenHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }

  // Keep token issue payload shape stable across service/repository boundary.
  toAuthPayload(user: { id: string; email: string; fullName: string; role: UserRole }) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };
  }
}
