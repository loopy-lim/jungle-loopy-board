import { getAllPosts } from "@/apis/posts";
import { GetAllPostsRequestDto } from "@/apis/posts/dtos";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetAllPostsQuery = (getAllPostsRequestDto?: GetAllPostsRequestDto) => {
  getAllPostsRequestDto ||= new GetAllPostsRequestDto();

  return useSuspenseQuery({
    queryKey: postQueryKeys.getAllPosts(),
    queryFn: () => getAllPosts(getAllPostsRequestDto),
  });
};

export default useGetAllPostsQuery;
