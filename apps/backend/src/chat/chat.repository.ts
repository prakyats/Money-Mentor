import { Injectable } from '@nestjs/common';
import { ChatMessageRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  ensureConversationForUser(userId: string) {
    return this.prisma.chatConversation.upsert({
      where: { userId },
      update: {},
      create: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  getConversationForUser(userId: string) {
    return this.prisma.chatConversation.findUnique({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  listHistoryForUser(userId: string) {
    return this.ensureConversationForUser(userId);
  }

  createMessage(input: {
    conversationId: string;
    userId: string;
    role: ChatMessageRole;
    content: string;
    requestId?: string;
    model?: string;
  }) {
    return this.prisma.chatMessage.create({
      data: input,
    });
  }

  async getFinanceContext(userId: string) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const [budget, transactions] = await Promise.all([
      this.prisma.budget.findFirst({
        where: {
          userId,
          month,
          year,
        },
        select: {
          amount: true,
          month: true,
          year: true,
        },
      }),
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { happenedAt: 'desc' },
        take: 8,
        select: {
          type: true,
          amount: true,
          note: true,
          happenedAt: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    return {
      budget,
      transactions,
    };
  }
}
