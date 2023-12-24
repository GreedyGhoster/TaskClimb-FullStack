import { Status } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class EditTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: Status;

  @IsOptional()
  @IsString()
  description?: string;
}
