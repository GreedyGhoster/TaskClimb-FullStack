import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nickName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
