import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddItem from "../pages/AddItem";
import PrivateRoute from "./PrivateRoute";
import Fridge from "../pages/Fridge";
import { foodLoader } from "../loaders/foodLoader";
import { singleFoodLoader } from "../loaders/singleFoodLoader";
import MyProfile from "../pages/MyProfile";
import MyItem from "../pages/MyItem";
import Details from "../pages/Details";
import UpdateItem from "../pages/UpdateItem";
import Dashboard from "../pages/DashBoard";
import FeedbackForm from "../pages/FeedbackForm";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "update-item/:id",
        element: (
          <PrivateRoute>
            <UpdateItem />
          </PrivateRoute>
        ),
        loader: singleFoodLoader,
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
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: singleFoodLoader,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        loader: foodLoader,
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <FeedbackForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
