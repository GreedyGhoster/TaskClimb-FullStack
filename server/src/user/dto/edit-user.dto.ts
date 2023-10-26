import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  nickName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
