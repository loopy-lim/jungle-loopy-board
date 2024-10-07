import { postLogin } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";

const useDeleteUserMutate = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.deleteUser,
    mutationFn: postLogin,
    retry: false,
  });
  return { mutate, isPending };
};

export default useDeleteUserMutate;
