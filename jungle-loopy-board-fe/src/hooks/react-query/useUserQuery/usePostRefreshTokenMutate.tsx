import { postRefreshToken } from "@/apis/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import userQueryKeys from "./queries";

const usePostRefreshTokenMutate = () => {
  return useSuspenseQuery({
    queryKey: userQueryKeys.refreshToken,
    queryFn: postRefreshToken,
  });
};

export default usePostRefreshTokenMutate;
