import { Status } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
