import {
  Body,
  Controller,
  Delete,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @ApiOperation({ description: 'Profile information' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  userInfo(@GetUser() user: User) {
    return this.userService.userInfo(user);
  }

  @Patch('me/edit/nickname')
  @ApiOperation({ description: 'Change account nickname' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The nickname is occupied by another user',
  })
  userEditNickName(
    @GetUser('id') userId: string,
    @Body() dto: EditUserNickNameDto,
  ) {
    return this.userService.userEditNickName(userId, dto);
  }

  @Patch('me/edit/password')
  @ApiOperation({ description: 'Change account password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The old possword is incorrect',
  })
  userEditPassword(
    @GetUser('id') userId: string,
    @Body() dto: EditUserPasswordDto,
  ) {
    return this.userService.userEditPassword(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete account' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You should log in to your account',
  })
  @Delete('me')
  userDelete(@GetUser('id') userId: string) {
    return this.userService.userDelete(userId);
  }
}
