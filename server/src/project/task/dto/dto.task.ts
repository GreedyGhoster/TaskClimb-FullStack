import { Status } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  status: Status;

  @IsOptional()
  @IsString()
  description?: string;
}
