import { postSignup } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";
import { SignupRequestUserDto } from "@/apis/users/dtos";

const useSignupMutate = (data: SignupRequestUserDto) => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.signup,
    mutationFn: () => postSignup(data),
    retry: false,
  });
  return { mutate, isPending };
};

export default useSignupMutate;
