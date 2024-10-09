import { putUpdateComment } from "@/apis/comments";
import { PutUpdateCommentRequestDto } from "@/apis/comments/dtos";
import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useUpdateCommentMutate = (postId: number) => {
  return useMutation({
    mutationKey: commentQueryKeys.createComment(),
    mutationFn: ({
      commentId,
      putUpdateCommentResponseDto,
    }: {
      commentId: number;
      putUpdateCommentResponseDto: PutUpdateCommentRequestDto;
    }) => putUpdateComment(postId, commentId, putUpdateCommentResponseDto),
  });
};

export default useUpdateCommentMutate;
