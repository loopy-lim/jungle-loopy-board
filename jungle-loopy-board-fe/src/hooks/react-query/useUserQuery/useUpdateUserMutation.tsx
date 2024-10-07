import { updateUser } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";
import { SignupRequestUserDto } from "@/apis/users/dtos";

const useUpdateUserMutation = (data: SignupRequestUserDto) => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.updateUser,
    mutationFn: () => updateUser(data),
    retry: false,
  });
  return { mutate, isPending };
};

export default useUpdateUserMutation;
