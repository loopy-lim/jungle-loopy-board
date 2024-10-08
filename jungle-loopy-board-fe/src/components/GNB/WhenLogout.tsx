import { RoutesLink } from "@/components/Link";
import { Button } from "@/components/ui/button";

const GNBWhenLogout = () => {
  return (
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
  );
};

export default GNBWhenLogout;
