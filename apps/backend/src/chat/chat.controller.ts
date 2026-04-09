import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@ApiTags('chat')
@Controller('api/v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  history(@Req() req: { user: { userId: string } }) {
    return this.chatService.history(req.user.userId);
  }

  @Post('message')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @Req() req: { user: { userId: string }; requestId?: string },
    @Body() dto: CreateChatMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.userId, dto, req.requestId);
  }

  @Get('public/history')
  publicHistory() {
    return this.chatService.publicHistory();
  }

  @Post('public/message')
  publicSendMessage(
    @Req() req: { requestId?: string },
    @Body() dto: CreateChatMessageDto,
  ) {
    return this.chatService.sendPublicMessage(dto, req.requestId);
  }
}
