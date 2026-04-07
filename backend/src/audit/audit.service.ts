import { Injectable } from '@nestjs/common';
import { AuditRepository } from './audit.repository';

interface AuditLogInput {
  actorId?: string;
  action: string;
  resource: string;
  metadata?: Record<string, unknown>;
  requestId?: string;
}

@Injectable()
export class AuditService {
  constructor(private readonly auditRepo: AuditRepository) {}

  async log(input: AuditLogInput) {
    await this.auditRepo.createLog(input);
  }
}
