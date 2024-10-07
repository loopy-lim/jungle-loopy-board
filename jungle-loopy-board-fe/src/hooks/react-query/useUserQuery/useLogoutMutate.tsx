import { postLogin } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";

const useLogoutMutate = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.logout,
    mutationFn: postLogin,
    retry: false,
  });
  return { mutate, isPending };
};

export default useLogoutMutate;
