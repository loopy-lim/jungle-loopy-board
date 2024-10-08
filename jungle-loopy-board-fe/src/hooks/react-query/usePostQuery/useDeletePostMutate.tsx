import { deletePost } from "@/apis/posts";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useMutation } from "@tanstack/react-query";

const useDeletePostMutate = ({ id }: { id: number }) => {
  return useMutation({
    mutationKey: postQueryKeys.deletePost(id),
    mutationFn: deletePost,
  });
};

export default useDeletePostMutate;
