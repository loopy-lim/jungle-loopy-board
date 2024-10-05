import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto, DeleteAccountResponseDto, RefreshResponseDto, SignUpResponseDto } from './dto/auth.dto';

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
      throw new UnauthorizedException('User already exists');
    }

    const newUser = await this.usersService.createUser({ email, password, name });
    if (!newUser) {
      throw new UnauthorizedException('Failed to create user');
    }
    return true;
  }

  async deleteAccount({ email, password }: DeleteAccountResponseDto) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const isDeleted = await this.usersService.deleteUser(user.user_pk);
    if (!isDeleted) {
      throw new UnauthorizedException('Failed to delete user');
    }
    return true;
  }

  async updateAccount({ email, password, name }: SignUpResponseDto) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
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
