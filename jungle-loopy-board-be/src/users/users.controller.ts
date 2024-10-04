import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  @Get()
  async getUser() {
    return { message: 'success' };
  }
}
