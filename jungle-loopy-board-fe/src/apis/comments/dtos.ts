export class PostCreateCommentRequestDto {
  content: string;
  parent_comment_id?: number;
  constructor({ content, parent_comment_id }: PostCreateCommentRequestDto) {
    this.content = content;
    this.parent_comment_id = parent_comment_id;
  }
}

export class PostCreateCommentResponseDto {
  message: string;
  constructor({ message }: PostCreateCommentResponseDto) {
    this.message = message;
  }
}

export class PutUpdateCommentRequestDto {
  content: string;
  constructor({ content }: PutUpdateCommentRequestDto) {
    this.content = content;
  }
}

export class PutUpdateCommentResponseDto {
  message: string;
  constructor({ message }: PutUpdateCommentResponseDto) {
    this.message = message;
  }
}

export class DeleteCommentResponseDto {
  message: string;
  constructor({ message }: DeleteCommentResponseDto) {
    this.message = message;
  }
}

export class Comment {
  comment_pk: number;
  content: string;
  parent_comment_pk: number;
  created_at: Date;
  updated_at: Date;
  user: {
    email: string;
    name: string;
  };
  constructor({ comment_pk, content, parent_comment_pk, created_at, updated_at, user: { email, name } }: Comment) {
    this.comment_pk = comment_pk;
    this.content = content;
    this.parent_comment_pk = parent_comment_pk;
    this.created_at = new Date(created_at);
    this.updated_at = new Date(updated_at);
    this.user = { email, name };
  }
}

export class GetAllCommentsResponseDto {
  comments: Comment[];
  constructor({ comments }: GetAllCommentsResponseDto) {
    this.comments = comments;
  }
}

export class GetAllCommentsRequestDto {
  postId: number;
  constructor({ postId }: GetAllCommentsRequestDto) {
    this.postId = postId;
  }
}

