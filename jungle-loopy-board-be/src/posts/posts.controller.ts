import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PageOptionsDto } from 'src/common/dtos/page.dto';
import { PostCreateRequestDto } from './posts.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @Get()
  async getAllPosts(@Query() pageOptionsDto: PageOptionsDto) {
    const result = await this.postService.getPaginate(pageOptionsDto);
    if (!result) {
      throw new HttpException('fail', 400);
    }
    return result;
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    const result = await this.postService.getPost(id);
    if (!result) {
      throw new HttpException('fail', 400);
    }
    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Res() res: Response, @Body() postCreateRequestDto: PostCreateRequestDto) {
    const user_email = res.user.email;
    const result = await this.postService.createPost(user_email, postCreateRequestDto);
    if (!result) {
      throw new HttpException('fail', 400);
    }
    return res.status(201).send({ message: 'success' });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePost(@Res() res: Response, @Param('id') id: number, @Body() postCreateRequestDto: PostCreateRequestDto) {
    const user_email = res.user.email;
    const result = await this.postService.updatePost(id, user_email, postCreateRequestDto);
    if (!result) {
      throw new HttpException('fail', 400);
    }
    return res.status(200).send({ message: 'success' });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(@Res() res: Response, @Param('id') id: number) {
    const user_email = res.user.email;
    const result = await this.postService.deletePost(id, user_email);
    if (!result) {
      throw new HttpException('fail', 400);
    }
    if (result.affected === 0) {
      throw new HttpException('fail', 400);
    }

    return res.status(200).send({ message: 'success' });
  }
}
