import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserNickNameDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Michael Jackson' })
  nickName?: string;
}

export class EditUserPasswordDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'poiuytrewq' })
  newPassword?: string;
}
