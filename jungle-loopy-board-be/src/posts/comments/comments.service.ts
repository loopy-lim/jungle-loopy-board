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

    const post = await this.postRepository.findOne({ where: { post_pk: createCommentDto.post_pk } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;

    if (createCommentDto.parent_comment_pk) {
      const parentComment = await this.commentRepository.findOne({ where: { comment_pk: createCommentDto.parent_comment_pk } });
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
      comment.parent_comment_pk = parentComment.comment_pk;
    }

    return this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentResponseDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
