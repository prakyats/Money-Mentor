import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  imports: [AuditModule],
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
