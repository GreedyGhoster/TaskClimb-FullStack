import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Michael Jackson' })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'poiuytrewq' })
  password?: string;
}
