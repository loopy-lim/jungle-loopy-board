import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, SignUpResponseDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signin')
  async signIn(@Body() body: AuthResponseDto, @Res() response: Response) {
    const { access_token } = await this.authService.signIn(body);
    if (!access_token) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    response.cookie('access_token', access_token, { httpOnly: true });
    return response.json({ message: 'success' });
  }

  @Post('signup')
  async signUp(@Body() body: SignUpResponseDto, @Res() response: Response) {
    const is_success = await this.authService.signUp(body);
    if (!is_success) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    return response.json({ message: 'success' });
  }
}
