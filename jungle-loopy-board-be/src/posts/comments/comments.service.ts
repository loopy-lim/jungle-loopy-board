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

  async create(email: string, post_pk: string, createCommentDto: CreateCommentResponseDto) {
    if (post_pk && isNaN(+post_pk)) {
      throw new NotFoundException('Post not found');
    }
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const post = await this.postRepository.findOne({ where: { post_pk: +post_pk } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;

    if (createCommentDto.parent_comment_id) {
      const parentComment = await this.commentRepository
        .findOne({ where: { comment_pk: createCommentDto.parent_comment_id } });
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
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.post_pk = :post_pk', { post_pk })
      .orderBy('comment.created_at', 'ASC')
      .getMany();
  }

  async update(id: number, email: string, updateCommentDto: UpdateCommentResponseDto) {
    const comment = await this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.comment_pk = :comment_pk', { comment_pk: id })
      .andWhere('user.email = :email', { email })
      .getOne();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return await this.commentRepository.update({ comment_pk: id }, updateCommentDto);
  }

  async remove(id: number, email: string) {
    const comment = await this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.comment_pk = :comment_pk', { comment_pk: id })
      .andWhere('user.email = :email', { email })
      .getOne();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return await this.commentRepository.softDelete({ comment_pk: id });
  }
}
