import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('api/v1/health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'money-mentor-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
