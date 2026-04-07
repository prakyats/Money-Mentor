import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByUser(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { happenedAt: 'desc' },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });
  }

  createForUser(input: {
    userId: string;
    type: TransactionType;
    amount: number;
    happenedAt: Date;
    note?: string;
    categoryId?: string;
  }) {
    return this.prisma.transaction.create({ data: input });
  }
}
