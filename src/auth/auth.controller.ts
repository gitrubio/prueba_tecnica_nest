import { Controller, Post, Body,  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }


}
