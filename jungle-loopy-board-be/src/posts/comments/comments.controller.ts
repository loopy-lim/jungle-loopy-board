import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentResponseDto, UpdateCommentResponseDto } from './comment.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Res() response: Response, @Body() createCommentDto: CreateCommentResponseDto) {
    const user_email = response.user.email;
    if (!user_email) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    const comments = this.commentsService.create(user_email, createCommentDto);
    if (!comments) {
      return response.status(400).json({ message: 'Bad Request' });
    }

    return response.status(201).json({ message: 'success' });
  }

  @Get()
  async findAll(@Param('postId') postId: string) {
    return await this.commentsService.findAll(+postId);
  }

  @Patch(':commentId')
  update(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentResponseDto) {
    return this.commentsService.update(+commentId, updateCommentDto);
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(+commentId);
  }
}
