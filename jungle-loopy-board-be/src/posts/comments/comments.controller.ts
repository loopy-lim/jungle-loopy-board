import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  Put
} from '@nestjs/common';
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

  @Put(':commentId')
  @UseGuards(AuthGuard)
  async update(@Res() response: Response, @Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentResponseDto) {
    const user_email = response.user.email;
    if (!user_email) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    const result = await this.commentsService.update(+commentId, user_email, updateCommentDto);
    if (!result) {
      return response.status(400).json({ message: 'Bad Request' });
    }

    return response.status(200).json({ message: 'success' });
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard)
  async remove(@Res() response: Response, @Param('commentId') commentId: string) {
    const user_email = response.user.email;
    if (!user_email) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    const result = await this.commentsService.remove(+commentId, user_email);
    if (!result) {
      return response.status(400).json({ message: 'Bad Request' });
    }
    return response.status(200).json({ message: 'success' });
  }
}
