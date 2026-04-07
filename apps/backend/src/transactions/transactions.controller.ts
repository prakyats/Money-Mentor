import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  list(@Req() req: { user: { userId: string } }) {
    return this.transactionsService.list(req.user.userId);
  }

  @Post()
  create(
    @Req() req: { user: { userId: string }; requestId?: string },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(req.user.userId, dto, req.requestId);
  }
}
