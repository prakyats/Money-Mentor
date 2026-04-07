import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

enum TransactionTypeValue {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export class CreateTransactionDto {
  @IsEnum(TransactionTypeValue)
  type!: 'EXPENSE' | 'INCOME';

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  amount!: number;

  @IsDateString()
  happenedAt!: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
