import { Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PageOptionsDto } from 'src/common/dtos/page.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get()
  getAllPosts(@Query('page') pageOptionsDto: PageOptionsDto) {
    return this.postService.getPaginate(pageOptionsDto);
  }

  @Get(':id')
  getPost() { }

  @Post()
  createPost() { }

  @Put(':id')
  updatePost() { }
}
