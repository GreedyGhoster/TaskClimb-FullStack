import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EditUserNickNameDto, EditUserPasswordDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userInfo(user: User) {
    try {
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
    } catch (err) {
      throw new ForbiddenException('Unknow error');
    }
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
        throw new ForbiddenException(
          'The nickname is occupied by another user',
        );
      } else {
        throw new UnauthorizedException('Please, login ');
      }
    }
  }

  async userEditPassword(userId: string, dto: EditUserPasswordDto) {
    try {
      // Check if password is incorrect
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new ForbiddenException('The user does not exist');

      const pwMatches = await argon.verify(user.hash, dto.oldPassword);

      if (!pwMatches) throw new ForbiddenException('Password is incorrect');

      // New password
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
      throw new ForbiddenException('The old possword is incorrect');
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
