import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

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

  async userEdit(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nickName: dto.nickName,
      },
    });

    return {
      nickName: user.nickName,
      createdAt: user.createdAt.toString().split('T')[0],
      updatedAt: user.updatedAt.toString().split('T')[0],
    };
  }

  async userDelete(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
