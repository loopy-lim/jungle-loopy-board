import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
