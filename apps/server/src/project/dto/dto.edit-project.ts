import { IsOptional, IsString } from 'class-validator';

export class EditProjectDto {
  @IsOptional()
  @IsString()
  title?: string;
}
