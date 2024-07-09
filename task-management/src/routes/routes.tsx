import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Home from "../pages/home";

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

  {
    path: "/home",
    element: <Home />,
  },
]);

export default router;
