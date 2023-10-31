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
  async signToken(userId: string, nickName: string) {
    const payload = {
      sub: userId,
      nickName: nickName,
    };

    const secret = await this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return { token: token };
  }
  async signup(dto: UserDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          nickName: dto.nickName,
          hash: hash,
        },
      });

      return this.signToken(user.id, user.nickName);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('The user already exists');
        }
        throw err;
      }
    }
  }
  async signin(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        nickName: dto.nickName,
      },
    });
    if (!user) throw new ForbiddenException('The user does not exist');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Password is incorrect');

    return this.signToken(user.id, user.nickName);
  }
}
