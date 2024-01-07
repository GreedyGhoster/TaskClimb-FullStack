import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'Math' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Learn some theorems' })
  description?: string;
}
