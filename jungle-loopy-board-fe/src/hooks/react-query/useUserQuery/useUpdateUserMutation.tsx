import { updateUser } from "@/apis/users";
import userQueryKeys from "./queries";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: userQueryKeys.updateUser,
    mutationFn: updateUser,
    retry: false,
  });
  return { mutate, isPending };
};

export default useUpdateUserMutation;
