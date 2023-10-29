import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, ProjectDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(userId: number, dto: ProjectDto) {
    return this.prisma.project.create({
      data: {
        userId: userId,
        title: dto.title,
      },
    });
  }

  async getProjectAndTasksById(userId: number, projectId: number) {
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

  async getProjects(userId: number) {
    return this.prisma.project.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async updateProjectById(
    userId: number,
    projectId: number,
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

  async deleteProjectById(userId: number, projectId: number) {
    return this.prisma.$transaction([
      this.prisma.project.delete({
        where: {
          id: projectId,
          userId: userId,
        },
      }),
      this.prisma.task.deleteMany({
        where: {
          projectId: projectId,
        },
      }),
    ]);
  }
}
