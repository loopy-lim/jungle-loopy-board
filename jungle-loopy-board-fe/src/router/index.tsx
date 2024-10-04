import HomePage from "@app/pages/home";
import { createBrowserRouter } from "react-router-dom";

type Paths = "/" | "/home";

export type RouterPaths = {
  path: Paths;
  element: JSX.Element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
] as RouterPaths[]);

export default router;
