import { Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditTaskDto {
  @ApiProperty({
    default: 'Mathematic',
    nullable: false,
    description: 'New title for task',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    default: 'Doing',
    nullable: true,
    description: 'New status for task',
  })
  @IsOptional()
  @IsString()
  status?: Status;

  @ApiProperty({
    default: 'Learn Pythagorean theorem',
    nullable: true,
    description: 'New description for task',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
