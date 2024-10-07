import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

// export type RouterPaths = router

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;
