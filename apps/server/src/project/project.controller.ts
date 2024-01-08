import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetUser } from '../auth/decorator';
import { EditProjectDto, ProjectDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { TaskService } from './task/task.service';
import { EditTaskDto, TaskDto } from './task/dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('ProjectsAndTasks')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  // Everything about projects
  @Post()
  @ApiOperation({ description: 'Create a project' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  createProject(@GetUser('id') userId: string, @Body() dto: ProjectDto) {
    return this.projectService.createProject(userId, dto);
  }

  @Get('tasks')
  @ApiOperation({ description: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  getTasks(@GetUser('id') userId: string) {
    return this.projectService.getTasks(userId);
  }

  @Get()
  @ApiOperation({ description: 'Get all projects' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  getProjects(@GetUser('id') userId: string) {
    return this.projectService.getProjects(userId);
  }

  @Patch(':projectId')
  @ApiOperation({ description: 'Update project data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project does not exist',
  })
  updateProjectById(
    @GetUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: EditProjectDto,
  ) {
    return this.projectService.updateProjectById(userId, projectId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId')
  @ApiOperation({ description: 'Delete a project' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project does not exist',
  })
  deleteProjectById(
    @GetUser('id') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProjectById(userId, projectId);
  }

  // Everything about tasks

  @Get(':projectId')
  @ApiOperation({ description: 'Get tasks in the project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project does not exist',
  })
  getTasksByProjectId(@Param('projectId') projectId: string) {
    return this.projectService.getTasksByProjectId(projectId);
  }

  @Post(':projectId')
  @ApiOperation({ description: 'Create a task' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project does not exist',
  })
  createTask(
    @GetUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: TaskDto,
  ) {
    return this.taskService.createTask(projectId, dto, userId);
  }

  @Get(':projectId/:taskId')
  @ApiOperation({ description: 'Get task information' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project or the task does not exist',
  })
  getTaskById(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.getTaskById(projectId, taskId);
  }

  @Patch(':projectId/:taskId')
  @ApiOperation({ description: 'Update task data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project or the task does not exist',
  })
  updateTaskById(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() dto: EditTaskDto,
  ) {
    return this.taskService.updateTaskById(projectId, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId/:taskId')
  @ApiOperation({ description: 'Delete a task' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project or the task does not exist',
  })
  deleteTaskById(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.deleteTaskById(projectId, taskId);
  }
}
