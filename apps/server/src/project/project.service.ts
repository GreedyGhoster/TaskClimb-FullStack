import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, ProjectDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(userId: string, dto: ProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        userId: userId,
        title: dto.title,
      },
    });

    return project;
  }

  async getTasks() {
    try {
      const tasks = await this.prisma.task.findMany();

      return tasks;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw err;
      }
    }
  }

  async getTasksByProjectId(projectId: string) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          projectId: projectId,
        },
      });

      return tasks;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw err;
      }
    }
  }

  async getProjects(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        userId: userId,
      },
    });

    return projects;
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
    await this.prisma.project.delete({
      where: {
        id: projectId,
        userId: userId,
      },
    });
  }
}
