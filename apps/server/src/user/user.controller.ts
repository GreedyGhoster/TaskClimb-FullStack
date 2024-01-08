import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { EditUserNickNameDto, EditUserPasswordDto } from './dto';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  userInfo(@GetUser() user: User) {
    return this.userService.userInfo(user);
  }

  @Patch('me/edit/nickname')
  userEditNickName(
    @GetUser('id') userId: string,
    @Body() dto: EditUserNickNameDto,
  ) {
    return this.userService.userEditNickName(userId, dto);
  }

  @Patch('me/edit/password')
  userEditPassword(
    @GetUser('id') userId: string,
    @Body() dto: EditUserPasswordDto,
  ) {
    return this.userService.userEditPassword(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  userDelete(@GetUser('id') userId: string) {
    return this.userService.userDelete(userId);
  }
}
