import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}

@ApiTags('auth')
@Controller('api/v1')
export class LegacyAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  legacyRegister(
    @Body()
    dto: {
      username?: string;
      fullName?: string;
      mail?: string;
      email?: string;
      password: string;
    },
  ) {
    return this.authService.register({
      fullName: dto.fullName ?? dto.username ?? '',
      email: (dto.email ?? dto.mail ?? '').toLowerCase(),
      password: dto.password,
    });
  }

  @Post('login')
  legacyLogin(
    @Body()
    dto: {
      mail?: string;
      email?: string;
      password: string;
    },
  ) {
    return this.authService.login({
      email: (dto.email ?? dto.mail ?? '').toLowerCase(),
      password: dto.password,
    });
  }
}
