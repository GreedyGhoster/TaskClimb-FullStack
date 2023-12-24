import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TaskService } from './task/task.service';

@Module({
  providers: [ProjectService, TaskService],
  controllers: [ProjectController],
})
export class ProjectModule {}
