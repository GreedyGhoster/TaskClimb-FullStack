import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetUser } from '../auth/decorator';
import { EditProjectDto, ProjectDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { TaskService } from './task/task.service';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  // Everything about projects
  @Post()
  createProject(@GetUser('id') userId: number, @Body() dto: ProjectDto) {
    return this.projectService.createProject(userId, dto);
  }

  @Get(':id')
  getProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.getProjectById(userId, projectId);
  }

  @Get()
  getProjects(@GetUser('id') userId: number) {
    return this.projectService.getProjects(userId);
  }

  @Patch(':id')
  updateProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.updateProjectById(userId, projectId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProjectById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProjectById(userId, projectId);
  }

  // Everything about tasks
  @Post()
  createTask(@GetUser('id') userId: number, @Body() dto: ProjectDto) {
    return this.projectService.createProject(userId, dto);
  }

  @Get(':id')
  getTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.getProjectById(userId, projectId);
  }

  @Patch(':id')
  updateTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.updateProjectById(userId, projectId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProjectById(userId, projectId);
  }
}
