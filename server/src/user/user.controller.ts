import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  userInfo(@GetUser() user: User) {
    return user;
  }

  @Patch()
  userEdit(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.userEdit(userId, dto);
  }
}
