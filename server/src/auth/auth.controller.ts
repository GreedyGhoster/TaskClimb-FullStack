import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signup(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @Post('signin')
  signin(@Body() dto: UserDto) {
    return this.authService.signin(dto);
  }
}
