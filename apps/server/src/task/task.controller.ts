import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { EditTaskDto, TaskDto } from './dto';
import { JwtGuard } from '../auth/guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('projects')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':projectId/tasks')
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
    return this.taskService.getTasksByProjectId(projectId);
  }

  @Post(':projectId/tasks')
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

  @Get(':projectId/tasks/:taskId')
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

  @Patch(':projectId/tasks/:taskId')
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

  @Delete(':projectId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
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
