import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, ProjectDto } from './dto';

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

  async getProjectById(userId: number, projectId: number) {
    return this.prisma.project.findUnique({
      where: {
        id: projectId,
        userId: userId,
      },
    });
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
    return this.prisma.project.delete({
      where: {
        id: projectId,
        userId: userId,
      },
    });
  }
}
