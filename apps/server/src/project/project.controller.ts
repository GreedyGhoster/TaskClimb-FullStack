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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

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

  @Get(':projectId')
  @ApiOperation({ description: 'Get project info' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The project does not exist',
  })
  getProjectInfo(@GetUser('id') userId: string) {
    return this.projectService.getProjectInfo(userId);
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

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
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
}
