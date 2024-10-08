import { ResponseError } from "@/apis/dtos";
import { getPost } from "@/apis/posts";
import { GetPostRequestDto, GetPostResponseDto } from "@/apis/posts/dtos";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetPostQuery = ({ id }: GetPostRequestDto) => {
  return useSuspenseQuery<GetPostResponseDto, ResponseError, GetPostRequestDto>(
    {
      queryKey: postQueryKeys.getPost(id),
      queryFn: () => getPost({ id }),
    },
  );
};

export default useGetPostQuery;
