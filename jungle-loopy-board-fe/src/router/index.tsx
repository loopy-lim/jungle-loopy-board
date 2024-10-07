import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
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
    path: "/logout",
    element: <LoginPage />,
  },
] as const satisfies RouteObject[];

export type Routes = (typeof routes)[number]["path"];
const router = createBrowserRouter(routes);

export default router;
