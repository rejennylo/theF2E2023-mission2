import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MainPage from "./pages/MainPage.jsx";

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/main", element: <MainPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
