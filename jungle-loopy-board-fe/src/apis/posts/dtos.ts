export class Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: {
    email: string;
    name: string;
  };
  constructor({ id, title, content, created_at, updated_at, user }: Post) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user;
  }
}

export class PageMeta {
  total: number;
  last_page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  constructor({ total, last_page, hasPreviousPage, hasNextPage }: PageMeta) {
    this.total = total;
    this.last_page = last_page;
    this.hasPreviousPage = hasPreviousPage;
    this.hasNextPage = hasNextPage;
  }
}

export class GetAllPostsRequestDto {
  page: number;
  take: number;
  constructor(getAllPostsRequest?: GetAllPostsRequestDto) {
    this.page = getAllPostsRequest?.page ?? 1;
    this.take = getAllPostsRequest?.take ?? 10;
  }
}

export class GetAllPostsResponseDto {
  posts: Post[];
  meta: PageMeta;
  constructor({ posts, meta }: GetAllPostsResponseDto) {
    this.posts = posts;
    this.meta = meta;
  }
}

export class GetPostRequestDto {
  id: number;
  constructor({ id }: GetPostRequestDto) {
    this.id = id;
  }
}

export class GetPostResponseDto {
  post: Post;
  constructor({ post }: GetPostResponseDto) {
    this.post = post;
  }
}

export class CreatePostRequestDto {
  title: string;
  content: string;
  constructor({ title, content }: CreatePostRequestDto) {
    this.title = title;
    this.content = content;
  }
}

export class CreatePostResponseDto {
  message: string;
  constructor({ message }: CreatePostResponseDto) {
    this.message = message;
  }
}

export class UpdatePostRequestDto {
  id: number;
  title: string;
  content: string;
  constructor({ id, title, content }: UpdatePostRequestDto) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

export class UpdatePostResponseDto {
  message: string;
  constructor({ message }: UpdatePostResponseDto) {
    this.message = message;
  }
}

export class DeletePostRequestDto {
  id: number;
  constructor({ id }: DeletePostRequestDto) {
    this.id = id;
  }
}

export class DeletePostResponseDto {
  message: string;
  constructor({ message }: DeletePostResponseDto) {
    this.message = message;
  }
}