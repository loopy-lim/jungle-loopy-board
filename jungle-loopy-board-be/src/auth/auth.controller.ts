import { Body, Controller, Delete, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, DeleteAccountResponseDto, SignUpResponseDto } from './auth.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Res() response: Response) {
    response.clearCookie('access_token');
    return response.json({ message: 'success' });
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteAccount(@Res() response: Response, @Body() body: DeleteAccountResponseDto) {
    response.clearCookie('access_token');
    const is_success = await this.authService.deleteAccount(body);

    if (!is_success) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    return response.json({ message: 'success' });
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateAccount(@Res() response: Response, @Body() body: SignUpResponseDto) {
    const is_success = await this.authService.updateAccount(body);

    if (!is_success) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    return response.json({ message: 'success' });
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refresh(@Res() response: Response) {
    const { email, name } = response.user;
    if (!email) {
      response.clearCookie('access_token');
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const { access_token } = await this.authService.refresh({ email, name });
    if (!access_token) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    response.cookie('access_token', access_token, { httpOnly: true });
    return response.json({ message: 'success' });
  }
}
