import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty({ required: true, default: 'Homework' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
