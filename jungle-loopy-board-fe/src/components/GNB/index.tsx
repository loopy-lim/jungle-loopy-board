import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GlobalNavBar = () => {
  return (
    <nav className="flex justify-between px-8 pt-12">
      <Link className="text-3xl font-light" to="/">
        Home
      </Link>
      <ul className="flex gap-3">
        <li>
          <Button size="lg" variant="default">
            회원가입
          </Button>
        </li>
        <li>
          <Button size="lg" variant="secondary">
            로그인
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default GlobalNavBar;
