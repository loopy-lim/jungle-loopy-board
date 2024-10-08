import { postUpdatePost } from "@/apis/posts";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useUpdatePostMutate = ({ id }: { id: number }) => {
  return useMutation({
    mutationKey: postQueryKeys.updatePost(id),
    mutationFn: postUpdatePost,
  });
};

export default useUpdatePostMutate;
