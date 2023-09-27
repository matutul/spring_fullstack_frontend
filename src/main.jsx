import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ViewUser from "./users/ViewUser.jsx";
import EditUser from "./users/EditUser.jsx";
import { ErrorPage } from "./layouts/ErrorPage.jsx";
import AddUser from "./users/AddUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "user/edit/:userId",
        element: <EditUser />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
