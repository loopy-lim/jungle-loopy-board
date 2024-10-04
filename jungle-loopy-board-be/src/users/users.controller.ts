import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserMeRequestDto } from 'src/auth/dto/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async getUser(@Param() param: UserMeRequestDto, @Res() response: Response) {
    const { email } = param;
    return response.json(await this.usersService.getUser({ email }));
  }
}
