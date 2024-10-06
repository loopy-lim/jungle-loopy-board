import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos/page.dto';
import { PostCreateRequestDto } from './post.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject("POST_REPOSITORY")
    private postRepository: Repository<Post>,
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
  ) { }
  async getPaginate(pageOptionsDto: PageOptionsDto) {
    const [posts, total] = await this.postRepository.findAndCount({
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });
    const last_page = pageMetaDto.last_page;

    if (pageOptionsDto.page > last_page) {
      throw new Error('Page not found');
    }

    return new PageDto(posts, pageMetaDto);
  }

  async getPost(post_pk: number) {
    return this.postRepository.findOne({ where: { post_pk } });
  }

  async createPost(email: string, post: PostCreateRequestDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.user = user;
    console.log(newPost);
    return this.postRepository.save(newPost);
  }

  async updatePost(post_pk: number, user_email: string, post: PostCreateRequestDto) {
    const user = await this.userRepository.findOne({ where: { email: user_email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const targetPost = await this.postRepository.findOne({ where: { post_pk, user } });
    if (!targetPost) {
      throw new NotFoundException('Post not found');
    }

    targetPost.title = post.title;
    targetPost.content = post.content;
    return this.postRepository.save(targetPost);
  }

  async deletePost(post_pk: number, user_email: string) {
    const user = await this.userRepository.findOne({ where: { email: user_email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const targetPost = await this.postRepository.findOne({ where: { post_pk, user } });
    if (!targetPost) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.softDelete({ post_pk: post_pk });
  }
}
