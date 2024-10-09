import { getAllComments } from "@/apis/comments";
import commentQueryKeys from "@/hooks/react-query/useCommentQuery/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

interface GetAllCommentsQueryParams {
  postId: number;
}

const useGetAllCommentsQuery = ({ postId }: GetAllCommentsQueryParams) => {
  return useSuspenseQuery({
    queryKey: commentQueryKeys.comment(),
    queryFn: () => getAllComments(postId),
  });
};

export default useGetAllCommentsQuery;
