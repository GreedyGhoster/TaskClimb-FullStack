import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditProjectDto {
  @ApiProperty({
    default: 'Programming',
    nullable: false,
    description: 'New title for project',
  })
  @IsOptional()
  @IsString()
  title?: string;
}
