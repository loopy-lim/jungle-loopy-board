import { postSignup } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";

const useSignupMutate = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.signup,
    mutationFn: postSignup,
    retry: false,
  });
  return { mutate, isPending };
};

export default useSignupMutate;
