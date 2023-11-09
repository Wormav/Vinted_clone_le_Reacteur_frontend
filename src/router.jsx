import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Offer from "./pages/Offers/Offer";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";

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
    ],
  },
]);

export default router;
