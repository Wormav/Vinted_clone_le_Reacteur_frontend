import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./main.css";
import { AuthProvider } from "./context/userContext";
import { ArticlesProvider } from "./context/articlesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArticlesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ArticlesProvider>
  </React.StrictMode>
);
