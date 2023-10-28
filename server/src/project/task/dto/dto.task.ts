import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  description?: string;
}
