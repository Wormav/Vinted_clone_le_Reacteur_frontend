import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Offer from "./pages/Offers/Offer";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Post from "./pages/Post/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      {
        path: "/offer/:id",
        element: <Offer />,
        children: [],
      },
      {
        path: "/signin",
        element: <Signin />,
        children: [],
      },
      {
        path: "/signup",
        element: <Signup />,
        children: [],
      },
      {
        path: "/post",
        element: <Post />,
        children: [],
      },
    ],
  },
]);

export default router;
