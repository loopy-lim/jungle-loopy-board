import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PageOptionsDto } from 'src/common/dtos/page.dto';
import { PostCreateRequestDto } from './dtos/post.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get()
  getAllPosts(@Query('page') pageOptionsDto: PageOptionsDto) {
    return this.postService.getPaginate(pageOptionsDto);
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Res() res: Response, @Body() postCreateREquestDto: PostCreateRequestDto) {
    const user_email = res.user.email;
    return this.postService.createPost(user_email, postCreateREquestDto);
  }

  @Put(':id')
  updatePost() { }
}
