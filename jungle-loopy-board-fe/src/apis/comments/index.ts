import { Comment, PostCreateCommentResponseDto, PutUpdateCommentRequestDto, PutUpdateCommentResponseDto, } from "@/apis/comments/dtos";
import { https } from "@/lib/https";

export const postCreateComment = async (postId: number, postCreateCommentResponseDto: PostCreateCommentResponseDto) => {
  const response = await https.post(`/posts/${postId}/comments`, postCreateCommentResponseDto);
  return new PostCreateCommentResponseDto(response);
}

export const getAllComments = async (postId: number): Promise<Comment[]> => {
  const response = await https.get(`/posts/${postId}/comments`);
  return response.map((comment: Comment) => new Comment(comment));
}

export const putUpdateComment = async (postId: number, commentId: number, putUpdateCommentRequestDto: PutUpdateCommentRequestDto) => {
  const response = await https.put(`/posts/${postId}/comments/${commentId}`, putUpdateCommentRequestDto);
  return new PutUpdateCommentResponseDto(response);
}

export const deleteComment = async (postId: number, commentId: number) => {
  const response = await https.delete(`/posts/${postId}/comments/${commentId}`);
  return response;
}