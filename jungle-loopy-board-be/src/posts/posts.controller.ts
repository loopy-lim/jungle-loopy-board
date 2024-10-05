import { Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get()
  getAllPosts(@Query('page') page: number = 1) {
    return this.postService.getPaginate(page);
  }

  @Get(':id')
  getPost() { }

  @Post()
  createPost() { }

  @Put(':id')
  updatePost() { }
}
