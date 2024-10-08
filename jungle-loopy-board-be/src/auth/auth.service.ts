import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto, DeleteAccountResponseDto, RefreshResponseDto, SignUpResponseDto } from './auth.dto';
import { User } from 'src/users/users.entity';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async getUser(token: string) {
    const decoded = this.jwtService.verify<User>(token, { secret: jwtConstants.secret });
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return decoded;
  }

  async signIn({ email, password }: AuthResponseDto) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const claim = {
      email: user.email,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(claim),
    }
  }

  async signUp({ email, password, name }: SignUpResponseDto) {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const newUser = await this.usersService.createUser({ email, password, name });
    if (!newUser) {
      throw new InternalServerErrorException('Failed to create user');
    }
    return true;
  }

  async deleteAccount({ email, password }: DeleteAccountResponseDto) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new ConflictException('User not found');
    }

    const isPasswordValid = this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const isDeleted = await this.usersService.deleteUser(user.user_pk);
    if (!isDeleted) {
      throw new InternalServerErrorException('Failed to delete user');
    }
    return true;
  }

  async updateAccount({ email, password, name }: SignUpResponseDto) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new ConflictException('User not found');
    }

    const isPasswordValid = this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    user.name = name;
    await this.usersService.updateUser(user.user_pk, { email, password, name });
    return true;
  }

  async refresh({ email, name }: RefreshResponseDto) {
    return {
      access_token: this.jwtService.sign({ email, name }),
    }
  }
}
