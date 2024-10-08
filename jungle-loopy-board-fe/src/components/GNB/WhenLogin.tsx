import { Button } from "@/components/ui/button";
import {
  useGetUserInfoQuery,
  useLogoutMutate,
} from "@/hooks/react-query/useUserQuery";
import userQueryKeys from "@/hooks/react-query/useUserQuery/queries";
import { useQueryClient } from "@tanstack/react-query";

const GDBWhenLogin = () => {
  const { data: userData } = useGetUserInfoQuery();
  const { mutate: logout } = useLogoutMutate();
  const queryClient = useQueryClient();

  const onLogout = () => {
    confirm("로그아웃 하시겠습니까?") &&
      logout(void 0, {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: userQueryKeys.userInfo });
        },
      });
  };

  return (
    <div className="flex items-baseline gap-2">
      <Button variant="ghost" onClick={onLogout}>
        로그아웃
      </Button>
      <div className="text-blue-950">
        반갑습니다 <span className="font-bold">{userData.name}</span> 님
      </div>
    </div>
  );
};

export default GDBWhenLogin;
