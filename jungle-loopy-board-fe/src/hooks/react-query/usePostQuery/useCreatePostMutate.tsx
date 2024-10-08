import { ResponseError } from "@/apis/dtos";
import { postCreatePost } from "@/apis/posts";
import { CreatePostRequestDto, CreatePostResponseDto } from "@/apis/posts/dtos";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useCreatePostMutate = () => {
  return useMutation<
    CreatePostResponseDto,
    ResponseError,
    CreatePostRequestDto
  >({
    mutationKey: postQueryKeys.createPost(),
    mutationFn: postCreatePost,
  });
};

export default useCreatePostMutate;
