import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
