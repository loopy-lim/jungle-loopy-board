import { RoutesLink } from "@/components/Link";
import Signup from "@/components/Users/Signup";

const SignupPage = () => {
  return (
    <div className="flex h-screen">
      <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
        <RoutesLink
          to="/"
          className="absolute left-12 top-12 flex items-center gap-4 p-4"
        >
          <img src="/favicon.png" alt="facivon" />
          <div className="text-xl text-blue-100">Loopy's</div>
        </RoutesLink>
        <div className="absolute bottom-12 right-24 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
          <div>걷는 것보다 더 중요한건</div>
          <div>넘어졌을 때 “일어나는 법"</div>
        </div>
      </div>
      <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
