import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
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
      createdAt: user.createdAt.toString().split('T')[0],
      updatedAt: user.updatedAt.toString().split('T')[0],
      projects: CountOfProjects,
      tasks: CountOfTasks,
    };
  }

  async userEdit(user: User, dto: EditUserDto) {
    try {
      const CountOfProjects = await this.prisma.project.count({
        where: { userId: user.id },
      });
      const CountOfTasks = await this.prisma.task.count({
        where: { userId: user.id },
      });

      const pwMatches = await argon.verify(user.hash, dto.oldPassword);

      if (!pwMatches) throw new ForbiddenException('Password is incorrect');

      const newHashedPassword = await argon.hash(dto.newPassword);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          nickName: dto.nickName,
          hash: newHashedPassword,
        },
      });

      return {
        nickName: updatedUser.nickName,
        createdAt: updatedUser.createdAt.toString().split('T')[0],
        updatedAt: updatedUser.updatedAt.toString().split('T')[0],
        projects: CountOfProjects,
        tasks: CountOfTasks,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The user already exists');
      }
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
