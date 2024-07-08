import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
