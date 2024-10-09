import { getPost } from "@/apis/posts";
import { GetPostRequestDto } from "@/apis/posts/dtos";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetPostQuery = ({ id }: GetPostRequestDto) => {
  return useSuspenseQuery({
    queryKey: postQueryKeys.getPost(id),
    queryFn: () => getPost({ id }),
  });
};

export default useGetPostQuery;
