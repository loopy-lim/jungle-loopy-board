import { Controller, Get, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get()
  getAllPosts() { }

  @Get(':id')
  getPost() { }

  @Post()
  createPost() { }

  @Put(':id')
  updatePost() { }
}
