import { postCreateComment } from "@/apis/comments";
import { PostCreateCommentResponseDto } from "@/apis/comments/dtos";
import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useCreateCommentMutate = (postId: number) => {
  return useMutation({
    mutationKey: commentQueryKeys.createComment(),
    mutationFn: (postCreateCommentResponseDto: PostCreateCommentResponseDto) =>
      postCreateComment(postId, postCreateCommentResponseDto),
  });
};

export default useCreateCommentMutate;
