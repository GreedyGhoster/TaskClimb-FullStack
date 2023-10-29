import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EditTaskDto, TaskDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(projectId: number, dto: TaskDto) {
    const task = await this.prisma.task.create({
      data: {
        projectId: projectId,
        ...dto,
      },
    });
    delete task.createdAt;
    delete task.updatedAt;
    delete task.id;
    delete task.projectId;

    return task;
  }

  async getTaskById(projectId: number, taskId: number) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id: taskId,
          projectId: projectId,
        },
      });
      delete task.id;
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

  async updateTaskById(projectId: number, taskId: number, dto: EditTaskDto) {
    const task = await this.prisma.task.update({
      where: {
        id: taskId,
        projectId: projectId,
      },
      data: {
        ...dto,
      },
    });
    delete task.id;
    delete task.projectId;
    delete task.createdAt;
    delete task.updatedAt;

    return task;
  }

  async deleteTaskById(projectId: number, taskId: number) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
        projectId: projectId,
      },
    });
  }
}
