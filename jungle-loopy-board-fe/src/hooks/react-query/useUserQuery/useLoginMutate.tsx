import { postLogin } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";
import { LoginRequestUserDto } from "@/apis/users/dtos";

const useLoginMutate = (data: LoginRequestUserDto) => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.login,
    mutationFn: () => postLogin(data),
    retry: false,
  });
  return { mutate, isPending };
};

export default useLoginMutate;
