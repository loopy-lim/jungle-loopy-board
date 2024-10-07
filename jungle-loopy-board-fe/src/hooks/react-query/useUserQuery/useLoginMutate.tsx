import { postLogin } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";
import { LoginRequestUserDto, LoginResponseUserDto } from "@/apis/users/dtos";
import { ResponseError } from "@/apis/dtos";

const useLoginMutate = () => {
  return useMutation<LoginResponseUserDto, ResponseError, LoginRequestUserDto>({
    mutationKey: userQueryKeys.login,
    mutationFn: postLogin,
    retry: false,
  });
};

export default useLoginMutate;
