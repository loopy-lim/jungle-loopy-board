import { postCreateComment } from "@/apis/comments";
import { PostCreateCommentRequestDto } from "@/apis/comments/dtos";
import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useCreateCommentMutate = (postId: number) => {
  return useMutation({
    mutationKey: commentQueryKeys.createComment(),
    mutationFn: (postCreateCommentRequestDto: PostCreateCommentRequestDto) =>
      postCreateComment(postId, postCreateCommentRequestDto),
  });
};

export default useCreateCommentMutate;
