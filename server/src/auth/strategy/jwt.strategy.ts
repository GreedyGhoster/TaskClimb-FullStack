import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
// JwtStrategy расширяет паспортную стратегию
// PassportStrategy принимает в себя стратегию jwt
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  // Валидация
  async validate(payload: { sub: number; email: string }) {
    // Находим пользователя по id
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;
    return user;
  }
}
