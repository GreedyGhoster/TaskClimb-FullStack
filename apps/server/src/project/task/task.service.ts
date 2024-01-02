import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EditTaskDto, TaskDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(projectId: string, dto: TaskDto) {
    const task = await this.prisma.task.create({
      data: {
        projectId: projectId,
        ...dto,
      },
    });
    delete task.createdAt;
    delete task.updatedAt;
    delete task.projectId;

    return task;
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
      if (err instanceof PrismaClientKnownRequestError) {
        throw err;
      }
    }
  }

  async updateTaskById(projectId: string, taskId: string, dto: EditTaskDto) {
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
    delete task.createdAt;
    delete task.updatedAt;

    return task;
  }

  async deleteTaskById(projectId: string, taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
        projectId: projectId,
      },
    });
  }
}
