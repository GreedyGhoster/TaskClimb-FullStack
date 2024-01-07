import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditProjectDto {
  @ApiProperty({ default: 'Programming' })
  @IsOptional()
  @IsString()
  title?: string;
}
