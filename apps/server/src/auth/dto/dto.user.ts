import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'John Smith' })
  nickName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'qwertyuiop' })
  password: string;
}
