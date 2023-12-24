import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userEdit(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nickName: dto.nickName,
      },
    });
    delete user.hash;

    return user;
  }

  async userDelete(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
