import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, ProjectDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

  async getTasksById(projectId: string) {
    try {
      return this.prisma.task.findMany({
        where: {
          projectId: projectId,
        },
      });
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
