import { Button } from "@/components/ui/button";
import { RoutesLink } from "../Link";

const GlobalNavBar = () => {
  return (
    <nav className="flex justify-between px-8 pt-12 backdrop-blur-md">
      <RoutesLink className="px-4 text-3xl font-light" to="/">
        Home
      </RoutesLink>
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
    </nav>
  );
};

export default GlobalNavBar;
