import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateAuditLogInput {
  actorId?: string;
  action: string;
  resource: string;
  metadata?: Record<string, unknown>;
  requestId?: string;
}

@Injectable()
export class AuditRepository {
  constructor(private readonly prisma: PrismaService) {}

  createLog(input: CreateAuditLogInput) {
    return this.prisma.auditLog.create({
      data: {
        actorId: input.actorId,
        action: input.action,
        resource: input.resource,
        metadata: input.metadata as never,
        requestId: input.requestId,
      },
    });
  }
}
