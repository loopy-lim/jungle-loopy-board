import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto, SignUpResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn({ email, password }: AuthResponseDto) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signUp({ email, password, name }: SignUpResponseDto) {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new UnauthorizedException();
    }

    const newUser = await this.usersService.createUser({ email, password, name });
    if (!newUser) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
