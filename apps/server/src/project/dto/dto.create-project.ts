import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    required: true,
    default: 'Homework',
    nullable: false,
    description: 'Title for project',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
