import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, ProjectDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(userId: string, dto: ProjectDto) {
    return this.prisma.project.create({
      data: {
        userId: userId,
        title: dto.title,
      },
    });
  }

  async getProjectAndTasksById(userId: string, projectId: string) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          projectId: projectId,
        },
      });

      const project = await this.prisma.project.findUnique({
        where: {
          id: projectId,
          userId: userId,
        },
      });
      delete project.id;
      delete project.userId;
      delete project.createdAt;
      delete project.updatedAt;

      return { project: project, tasks: tasks };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw err;
      }
    }
  }

  async getProjects(userId: string) {
    return this.prisma.project.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async updateProjectById(
    userId: string,
    projectId: string,
    dto: EditProjectDto,
  ) {
    return this.prisma.project.update({
      where: {
        id: projectId,
        userId: userId,
      },
      data: {
        title: dto.title,
      },
    });
  }

  async deleteProjectById(userId: string, projectId: string) {
    return this.prisma.project.delete({
      where: {
        id: projectId,
        userId: userId,
      },
    });
  }
}
