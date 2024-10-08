import { postLogout } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";

const useLogoutMutate = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.logout,
    mutationFn: postLogout,
    retry: false,
  });
  return { mutate, isPending };
};

export default useLogoutMutate;
