import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentResponseDto, UpdateCommentResponseDto } from './comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/users/users.entity';
import { Post } from '../posts.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) { }

  async create(email: string, createCommentDto: CreateCommentResponseDto) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const post = await this.postRepository.findOne({ where: { post_pk: createCommentDto.post_id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;

    if (createCommentDto.parent_comment_id) {
      const parentComment = await this.commentRepository.findOne({ where: { comment_pk: createCommentDto.parent_comment_id } });
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
      comment.parent_comment_pk = parentComment.comment_pk;
    }

    return await this.commentRepository.save(comment);
  }

  async findAll(post_pk: number) {
    const post = await this.postRepository.findOne({ where: { post_pk } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.commentRepository.createQueryBuilder('comment')
      .where('comment.post_pk = :post_pk', { post_pk })
      .getMany();
  }

  async update(id: number, email: string, updateCommentDto: UpdateCommentResponseDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const comment = await this.commentRepository.findOne({ where: { comment_pk: id, user } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return await this.commentRepository.update({ comment_pk: id }, updateCommentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
