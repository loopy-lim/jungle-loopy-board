import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentResponseDto, UpdateCommentResponseDto } from './comment.dto';
import { Response } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
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
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentResponseDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
