import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import useCreateCommentMutate from "@/hooks/react-query/useCommentQuery/useCreateCommentMutate";
import useDeleteCommentMutate from "@/hooks/react-query/useCommentQuery/useDeleteCommentMutate";
import useGetAllCommentsQuery from "@/hooks/react-query/useCommentQuery/useGetAllCommentsQuery";
import useUpdateCommentMutate from "@/hooks/react-query/useCommentQuery/usePutCommentMutate";

export {
  commentQueryKeys,
  useCreateCommentMutate,
  useGetAllCommentsQuery,
  useUpdateCommentMutate,
  useDeleteCommentMutate,
};
