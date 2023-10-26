import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signToken(userId: number, email: string) {
    // Данные для токена
    const payload = {
      sub: userId,
      email: email,
    };
    // Секрет для токена
    const secret = await this.config.get('JWT_SECRET');

    // Токен
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: secret,
    });

    return { token: token };
  }
  async signup(dto: UserDto) {
    try {
      // Хэш пароля
      const hash = await argon.hash(dto.password);

      // Создаем пользователя
      const user = await this.prisma.user.create({
        data: {
          nickName: dto.nickName,
          email: dto.email,
          hash: hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        // И если код ошибки P2002 (Prisma2002)
        if (err.code === 'P2002') {
          // Возвращаем сообщение об ошибке
          throw new ForbiddenException('The user already exists');
        }
        // Возващаем ошибку
        throw err;
      }
    }
  }
  async signin(dto: UserDto) {
    // Ищем пользователя по почте
    const user = await this.prisma.user.findFirst({
      where: {
        nickName: dto.nickName,
      },
    });

    // Сравниваем хэш и сам пароль
    const pwMatches = await argon.verify(user.hash, dto.password);

    // Проверка есть ли они вообще
    if (!pwMatches || !user)
      throw new ForbiddenException('The user already exists');

    return this.signToken(user.id, user.email);
  }
}
