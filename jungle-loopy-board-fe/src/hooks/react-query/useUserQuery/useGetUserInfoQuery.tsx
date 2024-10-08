import { getUserInfo } from "@/apis/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import userQueryKeys from "./queries";

const useGetUserInfo = () => {
  return useSuspenseQuery({
    queryKey: userQueryKeys.userInfo,
    queryFn: getUserInfo,
    retry: false,
  });
};

export default useGetUserInfo;
