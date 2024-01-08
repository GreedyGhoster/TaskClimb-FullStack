import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    default: 'John Smith',
    minLength: 5,
    nullable: false,
    description: 'Nickname',
  })
  nickName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    default: 'qwertyuiop',
    minLength: 8,
    nullable: false,
    description: 'Password',
  })
  password: string;
}
