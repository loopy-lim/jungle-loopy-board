import { postSignup } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";
import { SignupRequestUserDto, SignupResponseUserDto } from "@/apis/users/dtos";
import { ResponseError } from "@/apis/dtos";

const useSignupMutate = () => {
  return useMutation<
    SignupResponseUserDto,
    ResponseError,
    SignupRequestUserDto
  >({
    mutationKey: userQueryKeys.signup,
    mutationFn: postSignup,
    retry: false,
  });
};

export default useSignupMutate;
