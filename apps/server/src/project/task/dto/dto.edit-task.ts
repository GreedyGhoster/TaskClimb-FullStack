import { Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditTaskDto {
  @ApiProperty({ default: 'Mathematic' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ default: 'Doing' })
  @IsOptional()
  @IsString()
  status?: Status;

  @ApiProperty({ default: 'Learn Pythagorean theorem' })
  @IsOptional()
  @IsString()
  description?: string;
}
