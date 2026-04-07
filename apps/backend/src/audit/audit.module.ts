import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditRepository } from './audit.repository';
import { AuditService } from './audit.service';

@Module({
  providers: [AuditService, AuditRepository],
  controllers: [AuditController],
  exports: [AuditService],
})
export class AuditModule {}
