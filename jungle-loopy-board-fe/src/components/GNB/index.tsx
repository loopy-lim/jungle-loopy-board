import { Button } from "@/components/ui/button";
import { RoutesLink } from "../Link";
import {
  useGetUserInfoQuery,
  useLogoutMutate,
} from "@/hooks/react-query/useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import userQueryKeys from "@/hooks/react-query/useUserQuery/queries";

const GlobalNavBar = () => {
  const { data: userData } = useGetUserInfoQuery();
  const { mutate: logout } = useLogoutMutate();
  const queryClient = useQueryClient();

  const onLogout = () => {
    logout(void 0, {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: userQueryKeys.userInfo });
      },
    });
  };

  return (
    <nav className="flex justify-between px-8 pt-12 backdrop-blur-md">
      <RoutesLink className="px-4 text-3xl font-light" to="/">
        Jungle
      </RoutesLink>
      {userData?.name ? (
        <div className="flex items-baseline gap-2">
          <Button variant="ghost" onClick={onLogout}>
            로그아웃
          </Button>
          <div className="text-blue-950">
            반갑습니다 <span className="font-bold">{userData.name}</span> 님
          </div>
        </div>
      ) : (
        <ul className="flex gap-3">
          <li>
            <Button size="lg" variant="default" asChild>
              <RoutesLink to="/signup">회원가입</RoutesLink>
            </Button>
          </li>
          <li>
            <Button size="lg" variant="secondary" asChild>
              <RoutesLink to="/login">로그인</RoutesLink>
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default GlobalNavBar;
