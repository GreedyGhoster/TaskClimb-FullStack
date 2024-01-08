import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EditTaskDto, TaskDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(projectId: string, dto: TaskDto, userId: string) {
    try {
      const task = await this.prisma.task.create({
        data: {
          projectId: projectId,
          userId: userId,
          ...dto,
        },
      });
      delete task.createdAt;
      delete task.userId;
      delete task.updatedAt;
      delete task.projectId;

      return task;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The project does not exist');
      }
    }
  }

  async getTaskById(projectId: string, taskId: string) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id: taskId,
          projectId: projectId,
        },
      });
      delete task.projectId;
      delete task.createdAt;
      delete task.updatedAt;

      return task;
    } catch (err) {
      throw new ForbiddenException('The task does not exist');
    }
  }

  async updateTaskById(projectId: string, taskId: string, dto: EditTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id: taskId,
          projectId: projectId,
        },
        data: {
          ...dto,
        },
      });
      delete task.projectId;
      delete task.userId;
      delete task.createdAt;
      delete task.updatedAt;

      return task;
    } catch (err) {
      throw new ForbiddenException(
        'The task does not exist or status is invalid',
      );
    }
  }

  async deleteTaskById(projectId: string, taskId: string) {
    try {
      await this.prisma.task.delete({
        where: {
          id: taskId,
          projectId: projectId,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The task does not exist');
      }
    }
  }
}
