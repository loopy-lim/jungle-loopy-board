import { getUserInfo } from "@/apis/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import userQueryKeys from "./queries";

const useGetUserInfoQuery = () => {
  return useSuspenseQuery({
    queryKey: userQueryKeys.userInfo,
    queryFn: getUserInfo,
  });
};

export default useGetUserInfoQuery;
