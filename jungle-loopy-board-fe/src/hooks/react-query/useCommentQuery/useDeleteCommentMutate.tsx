import { deleteComment } from "@/apis/comments";
import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useDeleteCommentMutate = (postId: number) => {
  return useMutation({
    mutationKey: commentQueryKeys.createComment(),
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(postId, commentId),
  });
};

export default useDeleteCommentMutate;
