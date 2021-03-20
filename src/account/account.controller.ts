import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserType } from '../users/users.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('account')
export class AccountController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard) // Use LocalGuard, authorises auth from POST
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); // Get JWT of the user
    // PS: in case of failure, you'll get unauthorised
  }

  @UseGuards(JwtAuthGuard) // JWT Guard, avalaible only when having the Token
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Get User Details
  }

  @Post('register') // Create new User, gonna be secured with ReCapcha or something similar
  async register(@Body() user: UserType) {
    return this.userService.create(user);
  }
}
