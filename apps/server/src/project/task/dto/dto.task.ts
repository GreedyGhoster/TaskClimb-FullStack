import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    default: 'Math',
    nullable: false,
    description: 'Title for task',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Learn some theorems', nullable: false, description: 'Task description' })
  description?: string;
}
