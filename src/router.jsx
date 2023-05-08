/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { createBrowserRouter } from "react-router-dom";
import Upload from "./pages/Upload";
import CMISample from "./pages/CMISample";
import Login from "./pages/Login";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [])

  return <Component />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={Upload} />,
  },
  {
    path: "/cmi-sample",
    element: <ProtectedRoute element={CMISample} />,
  },
]);