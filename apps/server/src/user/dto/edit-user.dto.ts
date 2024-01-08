import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Michael Jackson' })
  nickName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'qwertyuiop' })
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'poiuytrewq' })
  newPassword?: string;
}
