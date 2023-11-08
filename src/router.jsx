import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Offer from "./pages/Offers/Offer";

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
    ],
  },
]);

export default router;
