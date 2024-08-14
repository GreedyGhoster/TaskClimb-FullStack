import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async getProjectInfo(userId: string) {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          userId: userId,
        },
      });
      delete project.createdAt;
      delete project.updatedAt;
      delete project.userId;

      return project;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The project does not exist');
      }
    }
  }

  async getProjects(userId: string) {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return projects;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The user does not exist');
      }
    }
  }

  async updateProjectById(
    userId: string,
    projectId: string,
    dto: EditProjectDto,
  ) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: {
          id: projectId,
          userId: userId,
        },
        data: {
          title: dto.title,
        },
      });
      return updatedProject;
    } catch (err) {
      if (err) throw new ForbiddenException('The project does not exist');
    }
  }

  async deleteProjectById(userId: string, projectId: string) {
    try {
      await this.prisma.project.delete({
        where: {
          id: projectId,
          userId: userId,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('The project does not exist');
      }
    }
  }
}
