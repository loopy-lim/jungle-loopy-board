import { CreatePostRequestDto, CreatePostResponseDto, DeletePostRequestDto, DeletePostResponseDto, GetAllPostsRequestDto, GetAllPostsResponseDto, GetPostRequestDto, GetPostResponseDto, PageMeta, Post, UpdatePostRequestDto, UpdatePostResponseDto } from "@/apis/posts/dtos";
import { https } from "@/lib/https";

export const getAllPosts = async ({ page, take }: GetAllPostsRequestDto) => {
  const response = await https.get(`/posts?${new URLSearchParams({ page: `${page}`, take: `${take}` })}`);
  return new GetAllPostsResponseDto({
    meta: new PageMeta(response.meta),
    posts: response.data.map((post: Record<string, any>) => new Post({
      content: post.content,
      id: post.post_pk,
      title: post.title,
      created_at: new Date(post.created_at),
      updated_at: new Date(post.updated_at),
      user: {
        email: post.user.email,
        name: post.user.name,
      }
    }))
  });
}

export const getPost = async ({ id }: GetPostRequestDto) => {
  const response = await https.get(`/posts/${id}`);
  return new GetPostResponseDto(response);
}

export const postCreatePost = async ({ content, title }: CreatePostRequestDto) => {
  const response = await https.post('/posts', { content, title });
  return new CreatePostResponseDto(response);
}

export const postUpdatePost = async ({ content, id, title }: UpdatePostRequestDto) => {
  const response = await https.put(`/posts/${id}`, { title, content });
  return new UpdatePostResponseDto(response);
}

export const deletePost = async ({ id }: DeletePostRequestDto) => {
  const response = await https.delete(`/posts/${id}`);
  return new DeletePostResponseDto(response);
}
