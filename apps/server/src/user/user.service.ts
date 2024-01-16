import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserNickNameDto, EditUserPasswordDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userInfo(user: User) {
    const CountOfProjects = await this.prisma.project.count({
      where: { userId: user.id },
    });
    const CountOfTasks = await this.prisma.task.count({
      where: { userId: user.id },
    });

    return {
      nickName: user.nickName,
      createdAt: user.createdAt.toISOString().split('T')[0],
      updatedAt: user.updatedAt.toISOString().split('T')[0],
      projects: CountOfProjects,
      tasks: CountOfTasks,
    };
  }

  async userEditNickName(userId: string, dto: EditUserNickNameDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          nickName: dto.nickName,
        },
      });

      return this.userInfo(updatedUser);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The user already exists');
      }
    }
  }

  async userEditPassword(userId: string, dto: EditUserPasswordDto) {
    try {
      const newHashedPassword = await argon.hash(dto.newPassword);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hash: newHashedPassword,
        },
      });

      return this.userInfo(updatedUser);
    } catch (err) {
      throw new ForbiddenException('The user does not exist');
    }
  }

  async userDelete(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
