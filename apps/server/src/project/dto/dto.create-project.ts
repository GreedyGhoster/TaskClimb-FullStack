import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
