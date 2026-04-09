import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly bcryptRounds: number;

  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    const configuredRounds = Number(this.config.get<string>('BCRYPT_ROUNDS', '10'));
    this.bcryptRounds = Number.isFinite(configuredRounds)
      ? Math.min(14, Math.max(8, Math.trunc(configuredRounds)))
      : 10;
  }

  async register(dto: RegisterDto) {
    const existing = await this.authRepo.findUserByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, this.bcryptRounds);
    const user = await this.authRepo.createUser({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash,
    });

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.authRepo.toAuthPayload(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.authRepo.findUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.authRepo.toAuthPayload(user),
      ...tokens,
    };
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        role: UserRole;
      }>(dto.refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET', 'change-me-refresh'),
      });

      const user = await this.authRepo.findUserById(payload.sub);

      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const validRefresh = await bcrypt.compare(dto.refreshToken, user.refreshTokenHash);
      if (!validRefresh) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.issueTokens(user.id, user.email, user.role);
      await this.storeRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async issueTokens(userId: string, email: string, role: UserRole) {
    const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET', 'change-me-access');
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET', 'change-me-refresh');
    const accessExp = this.config.get<string>('JWT_ACCESS_EXPIRES_IN', '15m');
    const refreshExp = this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { email, role },
        { subject: userId, secret: accessSecret, expiresIn: accessExp },
      ),
      this.jwtService.signAsync(
        { email, role },
        { subject: userId, secret: refreshSecret, expiresIn: refreshExp },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, this.bcryptRounds);
    await this.authRepo.updateRefreshTokenHash(userId, refreshTokenHash);
  }
}
