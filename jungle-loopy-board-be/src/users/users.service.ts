import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { SignUpResponseDto } from 'src/auth/dto/auth.dto';

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

  validatePassword(password: string, userPassword: string): boolean {
    return password === userPassword;
  }

  async createUser({ email, name, password }: SignUpResponseDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    return this.userRepository.save(user);
  }

  async deleteUser(user_pk: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { user_pk } });
    if
      (!user) {
      return false;
    }
    await this.userRepository.remove(user);
    return true;
  }

  async updateUser(user_pk: number, { email, name, password }: SignUpResponseDto): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { user_pk } });
    if (!user) {
      return false;
    }
    user.email = email;
    user.name = name;
    user.password = password;
    await this.userRepository.save(user);
    return true;
  }
}
