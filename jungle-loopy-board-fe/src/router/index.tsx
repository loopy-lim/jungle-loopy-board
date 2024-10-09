import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import PostsPage from "@/pages/posts";
import PostCreatePage from "@/pages/posts/create";
import SignupPage from "@/pages/signup";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts/create",
    element: <PostCreatePage />,
  },
  {
    path: "/posts/:id",
    element: <PostsPage />,
  },
] as const satisfies RouteObject[];

export type Routes = (typeof routes)[number]["path"];
const router = createBrowserRouter(routes);

export default router;
