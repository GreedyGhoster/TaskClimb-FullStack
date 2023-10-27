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
import { EditUserDto } from './dto';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  userInfo(@GetUser() user: User) {
    delete user.id;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }

  @Patch('me')
  userEdit(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.userEdit(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  userDelete(@GetUser('id') userId: number) {
    return this.userService.userDelete(userId);
  }
}
