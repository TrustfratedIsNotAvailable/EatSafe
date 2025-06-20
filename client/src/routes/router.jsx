import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import PrivateRoute from "./PrivateRoute";
import Fridge from "../pages/Fridge";
import { foodLoader } from "../loaders/foodLoader";
import MyProfile from "../pages/MyProfile";
import MyItem from "../pages/MyItem";
import { myItemLoader } from "../loaders/myItemLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "fridge",
        element: <Fridge />,
        loader: foodLoader,
      },
      {
        path: "add-item",
        element: (
          <PrivateRoute>
            <AddItem />
          </PrivateRoute>
        ),
      },
      {
        path: "my-item",
        element: (
          <PrivateRoute>
            <MyItem />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
