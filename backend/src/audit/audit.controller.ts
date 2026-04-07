import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuditService } from './audit.service';

@ApiTags('audit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/v1/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('ping')
  @Roles('ADMIN')
  ping(@Query('limit') limit = '20') {
    return {
      message: 'Audit module online',
      limit: Number(limit),
    };
  }
}
