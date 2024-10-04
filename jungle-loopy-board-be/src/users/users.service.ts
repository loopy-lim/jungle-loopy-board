import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { SignUpResponseDto, UserMeRequestDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }

  async validatePassword(password: string, userPassword: string): Promise<boolean> {
    return password === userPassword;
  }

  async createUser({ email, name, password }: SignUpResponseDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    return this.userRepository.save(user);
  }

  async getUser({ email }): Promise<UserMeRequestDto> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    return new UserMeRequestDto({ ...user });
  }
}
