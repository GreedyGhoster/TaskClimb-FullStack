import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserNickNameDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'Michael Jackson',
    minLength: 5,
    nullable: false,
    description: 'New nickname',
  })
  nickName?: string;
}

export class EditUserPasswordDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'qwertyuiop',
    minLength: 8,
    nullable: false,
    description: 'Old password',
  })
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: 'poiuytrewq',
    minLength: 8,
    nullable: false,
    description: 'New password',
  })
  newPassword?: string;
}
