import { Injectable } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly audit: AuditService,
  ) {}

  async list(userId: string) {
    return this.transactionsRepo.listByUser(userId);
  }

  async create(userId: string, dto: CreateTransactionDto, requestId?: string) {
    const created = await this.transactionsRepo.createForUser({
      userId,
      type: dto.type,
      amount: dto.amount,
      happenedAt: new Date(dto.happenedAt),
      note: dto.note,
      categoryId: dto.categoryId,
    });

    await this.audit.log({
      actorId: userId,
      action: 'transaction.create',
      resource: 'transaction',
      metadata: { transactionId: created.id },
      requestId,
    });

    return created;
  }
}
