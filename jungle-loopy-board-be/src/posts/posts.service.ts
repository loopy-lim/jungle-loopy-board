import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject("POST_REPOSITORY")
    private postRepository: Repository<Post>,
  ) { }
  async getPaginate(page: number) {
    const take = 1;

    const [post, total] = await this.postRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    })

    return {
      data: post,
      total,
      page,
      last_page: Math.ceil(total / take),
    }
  }
}
